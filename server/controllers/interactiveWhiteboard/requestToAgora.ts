const createRoom = async () => {
  try {
    const response: any = fetch('https://api.netless.link/v5/rooms', {
      method: 'POST',
      headers: {
        token:
          'NETLESSSDK_YWs9Y2d4Y1NTVG1rN25neGpkSSZub25jZT1mYzY1NGIwMC1jNzE5LTExZWQtYWM2OS1mOTc2YTcxOTk1OWUmcm9sZT0wJnNpZz1hMTU0ZWRkZTM3ODAwYjBlNjY5Mzk4NjBiZGQxZDY0ZDMyMzIyMDkzMjFhOGI3ZTNlODkzNGJjYmYzNzRmYTli',
        'Content-Type': 'application/json',
        region: 'us-sv',
      },
      body: JSON.stringify({
        isRecord: false,
      }),
    });
    const data = await response.json();
    console.log(data); 
    return data;
  } catch (error) {
    console.log(error);
  }
};

const generateRoomToken = async (id: string) => {
  try {
    const response: any = fetch(`https://api.netless.link/v5/tokens/rooms/${id}`, {
      method: 'POST',
      headers: {
        token: 'NETLESSSDK_YWs9Y2d4Y1NTVG1rN25neGpkSSZub25jZT1mYzY1NGIwMC1jNzE5LTExZWQtYWM2OS1mOTc2YTcxOTk1OWUmcm9sZT0wJnNpZz1hMTU0ZWRkZTM3ODAwYjBlNjY5Mzk4NjBiZGQxZDY0ZDMyMzIyMDkzMjFhOGI3ZTNlODkzNGJjYmYzNzRmYTli',
        'Content-Type': 'application/json',
        region: 'us-sv',
      },
      body: JSON.stringify({
        'lifespan': 3600000,
        'role': 'admin'
      }),
    });
    const token = await response.json();
    console.log(token); 
    return token;
  } catch (error) {
    console.log(error);
  }
};

export { createRoom, generateRoomToken };
  

