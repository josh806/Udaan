import process from "process";

const options = {
  method: "POST",
  url: "https://api.netless.link/v5/rooms",
  headers: {
    token:
      "NETLESSSDK_YWs9Y2d4Y1NTVG1rN25neGpkSSZub25jZT1mYzY1NGIwMC1jNzE5LTExZWQtYWM2OS1mOTc2YTcxOTk1OWUmcm9sZT0wJnNpZz1hMTU0ZWRkZTM3ODAwYjBlNjY5Mzk4NjBiZGQxZDY0ZDMyMzIyMDkzMjFhOGI3ZTNlODkzNGJjYmYzNzRmYTli",
    "Content-Type": "application/json",
    region: "us-sv",
  },
  body: JSON.stringify({
    isRecord: false,
  }),
};

function createRoom() {
  fetch(options.url, {
    method: options.method,
    headers: {
      token: options.headers.token,
      "Content-Type": options.headers["Content-Type"],
      region: options.headers.region,
    },
    body: options.body,
  }).then((res) => {
    res.json().then((data) => {
      console.log(data);
      return data as any;
    });
  });
}

export default createRoom;
