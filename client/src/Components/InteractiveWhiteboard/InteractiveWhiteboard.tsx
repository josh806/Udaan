import React, { useEffect, useRef, FC } from 'react';
import './InteractiveWhiteboard.css';
import createRoom from './Request';

const InteractiveWhiteboard: FC = () => {
     return (
            <div className="InteractiveWhiteboard">
               <button onClick={() => createRoom()}>
                    Create Room
                </button>
                </div>
        );
};

export default InteractiveWhiteboard;