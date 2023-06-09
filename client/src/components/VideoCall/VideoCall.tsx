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
import NoteTaking from '../notes/NoteTaking';

const appId = '982666deb2ab44e7a3ab95555076b864';
const token: string | null =
  '007eJxTYOCOUZ52eEnLJLH8r55SO+eGq5wsLX3oeypvYlXXZ9OUQE4FBksLIzMzs5TUJKPEJBOTVPNE48QkS1MgMDA3S7IwM3HzU01pCGRkSNfIYGFkgEAQn4chJLW4JDyzJMMrPyufgQEA1e0gKA==';

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
  const [showNote, setNote] = useState(false);
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
      initWhiteboard('7327d170-ff5c-465f-831f-dff9b12a5d02');
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
          noteState={{ showNote, setNote }}
        />
        {/* )} */}
        {start && tracks && <Videos users={remoteUsers} tracks={tracks} />}
        {showNote && <NoteTaking />}

        {showWhiteboard && <Fastboard />}
      </div>
    </>
  );
};
export default VideoCall;
