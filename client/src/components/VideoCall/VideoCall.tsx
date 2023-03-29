import React, { useEffect, useState } from 'react';
import Controls from './Controls';
import Videos from './Videos';
import './VideoCall.css';
import { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

import * as whiteboardService from '../../services/whiteboard.service';
import * as reduxLesson from '../../redux/lesson';
import { useDispatch } from 'react-redux';

import Fastboard from '../InteractiveWhiteboard/FastBoard';

const appId = '982666deb2ab44e7a3ab95555076b864';
const token: string | null =
  '007eJxTYJB/PI9r/bXWzgt7ZjGfuWrm9mbXviWLtPmdb1zRUCtxi16pwGBpYWRmZpaSmmSUmGRikmqeaJyYZGkKBAbmZkkWZiYfOJVTGgIZGUL2v2ViZIBAEJ+HISS1uCQ8syTDKz8rn4EBAJ96IxU=';
const useClient = createClient({
  mode: 'rtc',
  codec: 'vp8',
});
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = () => {
  const channelName = 'TestWithJojo';
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const dispatch = useDispatch();

  // Initialise the SDK
  const init = async (name: string) => {
    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType);
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
      setRemoteUsers((prevUsers) => {
        return prevUsers.filter((User) => User.uid !== user.uid);
      });
    });

    await client.join(appId, name, token, null);
    if (tracks) await client.publish([tracks[0], tracks[1]]);
    setStart(true);
  };

  const initWhiteboard = async (lessonId: string) => {
    const whiteboardData = await whiteboardService.createWhiteboard(lessonId);
    dispatch(
      reduxLesson.updateLesson({
        id: whiteboardData.lessonId,
        whiteboardToken: whiteboardData.token,
        whiteboardId: whiteboardData.uuid,
      })
    );
  };

  useEffect(() => {
    if (ready && tracks) {
      init(channelName);
      initWhiteboard('38a67a76-68c2-4a61-b1de-4d59353185bc');
    }
  }, [channelName, client, ready, tracks]);

  return (
    <>
      <div className='videocall-container'>
        {/* {ready && tracks && ( */}
        <Controls
          client={client}
          tracks={tracks}
          setStart={setStart}
          whiteboardState={{ showWhiteboard, setShowWhiteboard }}
        />
        {/* )} */}
        {start && tracks && <Videos users={remoteUsers} tracks={tracks} />}
        {showWhiteboard && <Fastboard />}
      </div>
    </>
  );
};

/*
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
*/

export default VideoCall;
