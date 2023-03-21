import React, { useEffect, useState } from "react";
import { WhiteWebSdk, RoomWhiteboard } from "white-react-sdk";
import { createRoom, getRoomToken } from "./Request";

const InteractiveWhiteboard = () => {
  const [room, setRoom] = useState(null);

  async function createRoomAndJoin() {
    try {
      const roomJSON = await createRoom();
      const roomToken = await getRoomToken(roomJSON.uuid);
      const whiteWebSdk = new WhiteWebSdk({
        appIdentifier: "F32XkMcZEe2safl2pxmVng/oPm-ru64AhNC1g",
        region: "us-sv",
      });
      const room = await whiteWebSdk.joinRoom({
        uuid: roomJSON.uuid,
        uid: "123",
        roomToken: roomToken,
      });
      setRoom(room);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button onClick={createRoomAndJoin}>Create Room and Join</button>
      {room && (
        <RoomWhiteboard
          room={room}
          style={{ width: "1000vh", height: "100vh", background: "white" }}

        />
      )}
    </div>
  );
};

export default InteractiveWhiteboard;
