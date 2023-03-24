import React, { useEffect, useState } from 'react';
import { WhiteWebSdk, RoomWhiteboard } from 'white-react-sdk';
import { createRoom, getRoomToken, getRooms } from './Request';

const InteractiveWhiteboard = () => {
  const [room, setRoom] = useState(null);

  async function createWhiteboard() {
    const roomJSON = await createRoom();
    const roomToken = await getRoomToken(roomJSON.uuid);
    const whiteBoard = new WhiteWebSdk({
      appIdentifier: 'F32XkMcZEe2safl2pxmVng/oPm-ru64AhNC1g',
      region: 'us-sv',
    });

    console.log(`uuid: ${roomJSON.uuid}`);

    return { whiteBoard, roomToken, uuid: roomJSON.uuid };
  }

  async function joinRoom() {
    try {
      const { whiteBoard, roomToken, uuid } = await createWhiteboard();

      console.log(whiteBoard, roomToken, uuid);

      const room = await whiteBoard
        .joinRoom({
          uuid,
          uid: '123',
          roomToken,
        })
        .then((room) => {
          const toolbar = document.getElementById('toolbar');
          console.log(toolbar);
          const toolNames = [
            'clicker',
            'selector',
            'rectangle',
            'eraser',
            'text',
            'arrow',
            'ellipse',
            'hand',
            'laserPointer',
            'shape',
            'straight',
          ];

          for (const idx in toolNames) {
            const toolName = toolNames[idx];
            const btn = document.createElement('BUTTON');
            btn.setAttribute('id', 'btn' + toolName);
            const t = document.createTextNode(toolName);
            btn.appendChild(t);

            // Listen for the event of clicking a button.
            btn.addEventListener('click', function (obj) {
              const ele = obj.target;
              // Call the setMemberState method to set the whiteboard tool.
              room.setMemberState({
                currentApplianceName: ele.getAttribute('id').substring(3),
                shapeType: 'pentagram',
                strokeColor: [255, 182, 200],
                strokeWidth: 12,
                textSize: 40,
              });
            });
            if (toolbar) toolbar.appendChild(btn);

            console.log(btn.getAttribute('id'));
          }
          setRoom(room);
        })
        .catch(function (err) {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button onClick={createWhiteboard}>Create Room</button>
      <button onClick={getRooms}>Get rooms</button>
      <button onClick={joinRoom}>Join</button>
      {room && (
        <RoomWhiteboard
          room={room}
          style={{ width: '1000vh', height: '100vh', background: 'white' }}
        />
      )}
      <div
        id="toolbar"
        style={{ background: 'black' }}
      ></div>
    </div>
  );
};

export default InteractiveWhiteboard;
