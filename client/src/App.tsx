import React from 'react';
import './App.css';
import { useState } from 'react';
import VideoChat from './Components/VideoChat';

function App() {
  // example of chat component on top of phaser
  // to be implemented with redux.
  const [chat, setChat] = useState(false);
  return (
    <>
      {chat ? (
        <VideoChat />
      ) : (
        <button className='open_chat' onClick={() => setChat(!chat)}>
          Show chat
        </button>
      )}
    </>
  );
}

export default App;
