import React from 'react';
import Phaser from './Phaser/Phaser';
import './App.css';
import { useState } from 'react';
import VideoChat from './Components/VideoChat/VideoChat';
import LiveBlocks from './Components/LiveBlocks/LiveBlocks';





function App() {
  // example of chat component on top of phaser
  // to be implemented with redux.
  const [chat, setChat] = useState(false);
  const scene = Phaser;
  let ui: JSX.Element;

  return (
    <>
      <LiveBlocks />
      {/* {chat ? (
        <VideoChat />
      ) : (
        <button className="open_chat" onClick={() => setChat(!chat)}>
          Show chat
        </button>
      )} */}
     
    </>
  );
}

export default App;
