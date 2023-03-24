import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { endVideoCall } from '../../redux/user';
import {
  ICameraVideoTrack,
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import Button from '@mui/material/Button';

const Controls = (props: {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  client: IAgoraRTCClient;
}) => {
  const dispatch = useDispatch();
  const { tracks, setStart, client } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

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
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    dispatch(endVideoCall());
  };

  return (
    <div className='controls'>
      <Button
        color='info'
        variant='contained'
        className={trackState.audio ? 'mute' : 'unmute'}
        onClick={() => mute('audio')}
      >
        {trackState.audio ? 'Mute' : 'Unmute'}
      </Button>
      <Button
        color='warning'
        variant='contained'
        className={trackState.video ? 'mute' : 'unmute'}
        onClick={() => mute('video')}
      >
        {trackState.video ? 'Hide video' : 'Turn video on'}
      </Button>
      <Button
        color='error'
        variant='contained'
        className='leave'
        onClick={leaveChannel}
      >
        Leave
      </Button>
    </div>
  );
};
export default Controls;
