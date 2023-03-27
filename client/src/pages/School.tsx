import React, { useState } from 'react';
import AuthRequired from './AuthRequired';
import { useSelector } from 'react-redux';
import VideoCall from '../components/VideoCall/VideoCall';
import BasicModal from '../components/BasicModal';
import PhaserRoot from '../Phaser/Phaser';
import { RootState } from '../redux/store';
import Profile from './Profile';
import NavBar from '../components/Navbar';
const School = () => {
  const [openModal, setOpenModal] = useState(true);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const { newUser, inCall } = useSelector((state: RootState) => state.users);
  const [chat, setChat] = useState(false);

  return (
    <AuthRequired>
      <>
        <NavBar />
        {chat && (
          <button
            className="open_chat"
            onClick={() => setChat(!chat)}
          >
            Show chat
          </button>
        )}
        {!newUser ? (
          <PhaserRoot />
        ) : (
          <BasicModal
            open={openModal}
            handleModal={handleModal}
          >
            <Profile />
          </BasicModal>
        )}
        {inCall && <VideoCall />}
      </>
    </AuthRequired>
  );
};

export default School;
