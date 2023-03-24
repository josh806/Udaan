import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthRequired from './AuthRequired';
import { useSelector } from 'react-redux';

import Profile from '../features/Profile';
import VideoCall from '../components/VideoCall/VideoCall';
import BasicModal from '../components/BasicModal';
import InteractiveWhiteboard from '../Components/InteractiveWhiteboard/InteractiveWhiteboard';

import PhaserRoot from '../Phaser/Phaser';
import { RootState } from '../redux/store';
const School = () => {
  /*
  Flow:
    Sign in
      New user
        Redirect to /profile
          First name
          Last name
          Set nickname (unique)
          email (blocked)

      Existing user
        Show /school

  */
  const { user } = useAuth0();
  const inCall = useSelector((state: RootState) => state.users.inCall);
  useEffect(() => {
    // User exists
    // OR
    // Create user and redirect to profile
    console.log(user);
  }, []);

  const [chat, setChat] = useState(false);
  return (
    <>
      <InteractiveWhiteboard />
      <AuthRequired>
        <>
          <BasicModal buttonLabel="My profile">
            <Profile />
          </BasicModal>
          <>
            {chat && (
              <button
                className="open_chat"
                onClick={() => setChat(!chat)}
              >
                Show chat
              </button>
            )}
            <PhaserRoot />
            {inCall && <VideoCall />}
          </>
        </>
      </AuthRequired>
    </>
  );
};

export default School;
