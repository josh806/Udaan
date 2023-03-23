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
      const room = await whiteWebSdk
        .joinRoom({
          uuid: roomJSON.uuid,
          uid: "123",
          roomToken: roomToken,
        })
        .then((room) => {
          var toolbar = document.getElementById("toolbar");
          console.log(toolbar);
          var toolNames = [
            "clicker",
            "selector",
            "rectangle",
            "eraser",
            "text",
            "arrow",
            "ellipse",
            "hand",
            "laserPointer",
            "shape",
            "straight",
          ];

          for (var idx in toolNames) {
            var toolName = toolNames[idx];
            var btn = document.createElement("BUTTON");
            btn.setAttribute("id", "btn" + toolName);
            var t = document.createTextNode(toolName);
            btn.appendChild(t);

            // Listen for the event of clicking a button.
            btn.addEventListener("click", function (obj) {
              var ele = obj.target;
              // Call the setMemberState method to set the whiteboard tool.
              room.setMemberState({
                currentApplianceName: ele.getAttribute("id").substring(3),
                shapeType: "pentagram",
                strokeColor: [255, 182, 200],
                strokeWidth: 12,
                textSize: 40,
              });
            });
            if (toolbar) toolbar.appendChild(btn);
            
            console.log(btn.getAttribute("id"));
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
      <button onClick={createRoomAndJoin}>Create Room and Join</button>
      {room && (
        <RoomWhiteboard
          room={room}
          style={{ width: "1000vh", height: "100vh", background: "white" }}
        />
      )}
      <div id="toolbar" style={{ background: "black" }}></div>
    </div>
  );
};

export default InteractiveWhiteboard;
