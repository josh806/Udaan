import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthRequired from './AuthRequired';
import { useSelector } from 'react-redux';
import VideoCall from '../Components/VideoCall/VideoCall';
import BasicModal from '../Components/BasicModal';
import PhaserRoot from '../Phaser/Phaser';
import { RootState } from '../redux/store';
import Profile from '../features/RegisterProfile';
import NavBar from '../Components/Navbar';

const School = () => {
  const [openModal, setOpenModal] = useState(true);

  const handleModal = () => {
    setOpenModal(!openModal);
  };
  const { user } = useAuth0();
  const { newUser, inCall } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    // User exists

    // OR
    // Create user and redirect to profile
    if (user) {
      console.log(user);
    }
  }, []);

  const [chat, setChat] = useState(false);
  return (
    <AuthRequired>
      <>
        <NavBar />
        {chat && (
          <button className='open_chat' onClick={() => setChat(!chat)}>
            Show chat
          </button>
        )}
        {!newUser ? (
          <PhaserRoot />
        ) : (
          <BasicModal open={openModal} handleModal={handleModal}>
            <Profile />
          </BasicModal>
        )}

        {inCall && <VideoCall />}
      </>
    </AuthRequired>
  );
};

export default School;
