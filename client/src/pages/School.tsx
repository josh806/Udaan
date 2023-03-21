import React, { useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import AuthRequired from './AuthRequired';
import VideoChat from '../components/VideoChat';

const School = () => {
  /* 
  IF user doesn't exist, 
    Redirect to /profile
    Create and make user choose avatar

  */

  const [chat, setChat] = useState(false);
  return (
    <AuthRequired>
      {chat ? (
        <VideoChat />
      ) : (
        <button
          className="open_chat"
          onClick={() => setChat(!chat)}
        >
          Show chat
        </button>
      )}
    </AuthRequired>
  );
};

export default School;
