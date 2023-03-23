import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthRequired from './AuthRequired';

import Profile from '../features/Profile';

import VideoChat from '../Components/VideoChat';
import BasicModal from '../Components/BasicModal';

import PhaserRoot from '../Phaser/Phaser';
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

  useEffect(() => {
    // User exists
    // OR
    // Create user and redirect to profile
    console.log(user);
  }, []);

  const [chat, setChat] = useState(false);
  return (
    <AuthRequired>
      <>
        <BasicModal buttonLabel='My profile'>
          <Profile />
        </BasicModal>
        {chat ? (
          <VideoChat />
        ) : (
          <>
            <button className='open_chat' onClick={() => setChat(!chat)}>
              Show chat
            </button>
            <PhaserRoot />
          </>
        )}
      </>
    </AuthRequired>
  );
};

export default School;
