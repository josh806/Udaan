import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { endVideoCall } from '../../redux/user';
import './VideoChat.css';
import {
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from 'agora-rtc-react';
import { RootState } from '../../redux/store';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const appId = '982666deb2ab44e7a3ab95555076b864';
const token: string | null =
  '007eJxTYDDoVxHmPO/Wdk5yUXDOR/6Nj9bt0X+dvmTrP84f75wCHYwVGCwtjMzMzFJSk4wSk0xMUs0TjROTLE2BwMDcLMnCzEReXSalIZCRYUNWBSsjAwSC+DwMIanFJeGZJRle+cUZDAwAFaEhPA==';
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

//VideoComponent for the video call
const VideoCall = (props: { channelName: string }) => {
  const { channelName } = props;
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    // function to initialise the SDK
    const init = async (name: string) => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log('subscribe success');
        if (mediaType === 'video') {
          setRemoteUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      });

      client.on('user-unpublished', (user, type) => {
        console.log('unpublished', user, type);
        if (type === 'audio') {
          user.audioTrack?.stop();
        }
        if (type === 'video') {
          setRemoteUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on('user-left', (user) => {
        console.log('leaving', user);
        setRemoteUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log('init ready');
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div>
      {ready && tracks && <Controls tracks={tracks} setStart={setStart} />}
      {start && tracks && <Videos users={remoteUsers} tracks={tracks} />}
    </div>
  );
};

const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
  const { users, tracks } = props;
  return (
    <div>
      <div id='videos'>
        <AgoraVideoPlayer className='vid' videoTrack={tracks[1]} />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  className='vid'
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

export const Controls = (props: { tracks: any; setStart: any }) => {
  const dispatch = useDispatch();
  const client = useClient();
  const { tracks, setStart } = props;
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
      <p
        className={trackState.audio ? 'mute' : 'unmute'}
        onClick={() => mute('audio')}
      >
        {trackState.audio ? 'Mute' : 'Unmute'}
      </p>
      <p
        className={trackState.video ? 'mute' : 'unmute'}
        onClick={() => mute('video')}
      >
        {trackState.video ? 'Hide video' : 'Turn video on'}
      </p>
      <p className='leave' onClick={leaveChannel}>
        Leave
      </p>
    </div>
  );
};

//Form to enter the channel name
// const ChannelForm = (props: {
//   setInCall: React.Dispatch<React.SetStateAction<boolean>>;
//   setChannelName: React.Dispatch<React.SetStateAction<string>>;
// }) => {
//   const { setInCall, setChannelName } = props;
//   return (
//     <form className="join">
//       {appId === '' ? (
//         <p style={{ color: 'red' }}>Please enter your Student ID</p>
//       ) : null}
//       <input
//         type="text"
//         placeholder="Enter Channel Name"
//         onChange={(e) => setChannelName(e.target.value)}
//       />
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           setInCall(true);
//         }}
//       >
//         Join
//       </button>
//     </form>
//   );
// };

const VideoChat: React.FC = () => {
  const { inCall } = useSelector((state: RootState) => state.users);
  // const [inCall, setInCall] = useState(true);
  return <>{inCall && <VideoCall channelName='TestWithJosh' />}</>;
};
export default VideoChat;
