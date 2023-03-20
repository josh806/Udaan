import env from './.env';

const options = {
  method: "POST",
  url: "https://api.netless.link/v5/rooms",
  headers: {
    token: process.env.APP_SDKTOKEN,
    "Content-Type": "application/json",
    region: "us-sv",
  },
  body: JSON.stringify({
    isRecord: false,
  }),
};

fetch(options.url, {
  method: options.method,
  headers: options.headers,
  body: options.body,
}).then((res) => {
    res.json().then((data) => {
    return data as any;
    });
});    
        

export default Request;
