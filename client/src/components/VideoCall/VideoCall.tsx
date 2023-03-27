import React, { useEffect, useState } from 'react';
import Controls from './Controls';
import Videos from './Videos';
import './VideoCall.css';
import { ClientConfig, IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const appId = '982666deb2ab44e7a3ab95555076b864';
const token: string | null =
  '007eJxTYLBcEHJ6qcCrx6cCf0jnm9nsiZ+mbWquvf/ks1dvH36KYQpTYLC0MDIzM0tJTTJKTDIxSTVPNE5MsjQFAgNzsyQLMxPfKtmUhkBGBrMEZVZGBggE8fkZQlKLS8IzSzK88hMLSzPzGBgA62gjRw==';
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

//VideoComponent for the video call
const VideoCall = () => {
  const channelName = 'TestWithJoaquin';
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
      console.log('--- Start Video ---');
      setStart(true);
    };

    if (ready && tracks) {
      console.log('init ready');
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div className="videocall-container">
      {ready && tracks && (
        <Controls
          client={client}
          tracks={tracks}
          setStart={setStart}
        />
      )}
      {start && tracks && (
        <Videos
          users={remoteUsers}
          tracks={tracks}
        />
      )}
    </div>
  );
};

//Form to enter the channel name, to be used for teachers to create class.
// right now it is for entering the class. need to be refactored
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
export default VideoCall;
