// import React, { useEffect, useRef, FC } from "react";
// import "./InteractiveWhiteboard.css";
// import { WhiteWebSdk, Room, RoomPhase, RoomState } from "white-web-sdk";

// const InteractiveWhiteboard = () => {
//   const createRoom = () => {
//         const room: Room = WhiteWebSdk
//     console.log("Create Room");
//     fetch("http://localhost:3001/room/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({}),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         let response = JSON.stringify(data);
//         console.log(response, 'hello');
       
//       });
//   };

//   const joinRoom = () => {
//     console.log("Join Room");
//     fetch("http://localhost:3001/room/join/f7ef7cb0c74d11ed85245975e226531a", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         return data;
//       });
//   };
//   return (
//     <div className="InteractiveWhiteboard">
//       <button onClick={() => createRoom()}>Create Room</button>
//       <button onClick={() => joinRoom()}>Join Room</button>
//     </div>
//   );
// };

// export default InteractiveWhiteboard;




import React from'react';
import {WhiteWebSdk, RoomWhiteboard} from "white-react-sdk";

class InteractiveWhiteboard extends React.Component {

    static sdkToken = "NETLESSSDK_YWs9Y2d4Y1NTVG1rN25neGpkSSZub25jZT1mYzY1NGIwMC1jNzE5LTExZWQtYWM2OS1mOTc2YTcxOTk1OWUmcm9sZT0wJnNpZz1hMTU0ZWRkZTM3ODAwYjBlNjY5Mzk4NjBiZGQxZDY0ZDMyMzIyMDkzMjFhOGI3ZTNlODkzNGJjYmYzNzRmYTli";
    static whiteWebSdk = new WhiteWebSdk({
        appIdentifier: "F32XkMcZEe2safl2pxmVng/oPm-ru64AhNC1g",
    });

    constructor(props:any ) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var self = this;
        var roomUUID = "";

        this.createRoom().then(function(roomJSON) {
            // The room is created successfully, get the roomJSON describing the content of the room
            roomUUID = roomJSON.uuid;
            console.log("roomUUID: " + JSON.stringify(roomJSON));
            return self.createRoomToken(roomUUID);

        }).then(function (roomToken) {
                console.log(roomToken)
            // The roomToken of the room has been checked out
            return InteractiveWhiteboard.whiteWebSdk.joinRoom({
                uuid: roomUUID,
                roomToken: roomToken
            });
        }).then(function(room) {
                console.log(room)
            self.setState({room: room});

        }).catch(function(err) {
            // failed to create room
            console.error(err, "failed to create room");
        });
    }

    createRoom() {
        var url = "https://shunt-api.netless.link/v5/rooms";
        var requestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": InteractiveWhiteboard.sdkToken,
                "region": "cn-hz",
            },
        };
        return window.fetch(url, requestInit).then(function(response) {
            return response.json();
        });
    }

    createRoomToken(roomUUID: string) {
        var url = "https://shunt-api.netless.link/v5/rooms" + roomUUID;
        var requestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": InteractiveWhiteboard.sdkToken,
            },
            body: JSON.stringify({
                "lifespan": 0, // indicates that the Room Token will never expire
                "role": "admin", // indicates that Room Token has Admin authority
            }),
        };
        return window.fetch(url, requestInit).then(function(response) {
            return response.json();
        });
    }

    render() {
        var whiteboardView = null;

        // Creating and joining a room is an asynchronous operation.
        // If this.state.room is not ready, the whiteboard will not be displayed.
        if (this.state.room) {
            whiteboardView = (
                <RoomWhiteboard room={this.state.room}
                                style={{
                                    width: "100%",
                                    height: "100vh",
                                }}/>
            );
        }
        return (
            <div className="InteractiveWhiteboard">
                {whiteboardView}
            </div>
        );
    }
}

export default InteractiveWhiteboard;

