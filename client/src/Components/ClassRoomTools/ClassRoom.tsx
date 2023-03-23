import React from 'react';
import { useState, useEffect, FC } from 'react';
import { createClassRoom } from './flexibleclassroom_service';
import { AgoraEduSDK } from 'agora-classroom-sdk';
import Room from './Room';

const InteractiveTool: React.FC = () => {
  async function handleClassRoom() {
    const div = document.getElementById('room');
    // const response = await createClassRoom()
    AgoraEduSDK.config({
      appId: '982666deb2ab44e7a3ab95555076b864',
      region: 'eu',
    });

    // Launch Flexible Classroom
    if (div) {
      const room = await  AgoraEduSDK.launch(div, {
        rtmToken: '007eJxSYPB+tifermRrpPvl511sDtxxTaqdfidD134/cTgr3MTn3WcFBksLIzMzs5TUJKPEJBOTVPNE48QkS1NTU1MDc7MkCzOTaF7plOiN66w+neJnYGRgYmBkYGQA8RkZDAABAAD//8/hH7I=',
        userUuid: 'test',
        userName: 'teacher',
        roomUuid: '4321',
        roleType: 1,
        roomType: 4,
        roomName: 'demo-class',
        pretest: false,
        language: 'en',
        startTime: new Date().getTime(),
        duration: 60 * 30,
        courseWareList: [],
        listener: (ready) => {
          console.log('ready', ready, 'yes');
        }
      })
        .then(() => {
          console.log('start launch');
        })
        .catch((e) => {
          console.error('failed to launch', e);
        });
      return room;
    }

    
  }

  return (
    <div id="room">
      <button onClick={() => handleClassRoom()}> Class Room</button>
    </div>
  );
};

export default InteractiveTool;
