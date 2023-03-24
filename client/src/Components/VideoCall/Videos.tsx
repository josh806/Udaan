import React from 'react';
import './VideoCall.css';
import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import { AgoraVideoPlayer } from 'agora-rtc-react';

const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
  const { users, tracks } = props;
  return (
    <div className='video-container'>
      <AgoraVideoPlayer className='video' videoTrack={tracks[1]} />
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <AgoraVideoPlayer
                className='video'
                videoTrack={user.videoTrack}
                key={user.uid}
              />
            );
          } else return null;
        })}
    </div>
  );
};
export default Videos;
