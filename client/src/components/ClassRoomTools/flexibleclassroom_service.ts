const URL = 'https://api.agora.io/';
const appID = '982666deb2ab44e7a3ab95555076b864';
const token_value = '007eJxSYPB+tifermRrpPvl511sDtxxTaqdfidD134/cTgr3MTn3WcFBksLIzMzs5TUJKPEJBOTVPNE48QkS1NTU1MDc7MkCzOTaF7plOiN66w+neJnYGRgYmBkYGQA8RkZDAABAAD//8/hH7I=';

const auth_token = `agora token=${token_value}`;

const createClassRoom = () => {
  const data = fetch(URL + `eu/edu/apps/${appID}/v2/rooms/123445679`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token,
    },
    body: JSON.stringify({
      roomType: 0,
      roomName: 'test2',
      roomProperties: {
        'schedule': {
          'startTime': Date.now(),
          'duration': 600,
          'closeDelay': 300
        },
        'processes': {
          'handsUp': {
            'maxAccept': 10
          }
        }
      }
     
    })
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    });

  return data;
};

export {createClassRoom};
