import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { endVideoCall } from '../../redux/user';
import {
  ICameraVideoTrack,
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';

import * as muiIcons from './control-components';

const Controls = (props: {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  client: IAgoraRTCClient;
  whiteboardState: {
    showWhiteboard: boolean;
    setShowWhiteboard: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) => {
  const { showWhiteboard, setShowWhiteboard } = props.whiteboardState;
  const dispatch = useDispatch();
  const { tracks, setStart, client } = props;
  const [trackState, setTrackState] = useState({
    video: true,
    audio: true,
  });

  const mute = async (type: 'audio' | 'video') => {
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState({ ...trackState, audio: !trackState.audio });
    } else {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState({ ...trackState, video: !trackState.video });
    }
  };

  const leaveChannel = async () => {
    console.log('leaving call');
    dispatch(endVideoCall());
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
  };

  const toggleWhiteboard = () => {
    mute('video');
    setShowWhiteboard(!showWhiteboard);
  };

  return (
    <div className="controls">
      <muiIcons.Button
        color="info"
        variant="contained"
        onClick={toggleWhiteboard}
        className="_btn"
      >
        <muiIcons.Icon className="_btn__icon">
          {showWhiteboard ? (
            <muiIcons.WebAssetOffIcon />
          ) : (
            <muiIcons.WebAssetIcon />
          )}
        </muiIcons.Icon>
        <span className="_btn__label">
          {showWhiteboard ? 'No Whiteboard' : 'Whiteboard'}
        </span>
      </muiIcons.Button>
      <muiIcons.Button
        color="info"
        variant="contained"
        className={`_btn ${trackState.audio ? 'mute' : 'unmute'}`}
        onClick={() => mute('audio')}
      >
        <muiIcons.Icon className="_btn__icon">
          {trackState.audio ? <muiIcons.MicIcon /> : <muiIcons.MicOffIcon />}
        </muiIcons.Icon>
        <span className="_btn__label">
          {trackState.audio ? 'Mute' : 'Unmute'}
        </span>
      </muiIcons.Button>
      {!showWhiteboard && (
        <muiIcons.Button
          variant="contained"
          className={`_btn ${trackState.video && !props ? 'Mute' : 'Unmute'}`}
          onClick={() => mute('video')}
        >
          <muiIcons.Icon className="_btn__icon">
            {trackState.video ? (
              <muiIcons.VideocamIcon />
            ) : (
              <muiIcons.VideocamOffIcon />
            )}
          </muiIcons.Icon>
          <span className="_btn__label">
            {trackState.video ? 'No Video' : 'Video'}
          </span>
        </muiIcons.Button>
      )}
      <muiIcons.Button
        color="error"
        variant="contained"
        className="leave"
        onClick={leaveChannel}
      >
        Leave
      </muiIcons.Button>
    </div>
  );
};
export default Controls;
