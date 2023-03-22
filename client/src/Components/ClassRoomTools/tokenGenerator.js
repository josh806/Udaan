

// Parameters for the login method
let options = {
    token: "",
    uid: ""
}

// Whether to stop the token renew loop
let stopped = false

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function fetchToken(uid) {

    return new Promise(function (resolve) {
        axios.post('http://localhost:8082/fetch_rtm_token', {
            uid: uid,
        }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .then(function (response) {
                const token = response.data.token;
                console.log(token)
                resolve(token);
            })
            .catch(function (error) {
                console.log(error);
            });
    })
}

async function loginRTM()
{

    // Your app ID
    const appID = "982666deb2ab44e7a3ab95555076b864"

    // Initialize the client
    const client = AgoraRTM.createInstance(appID)

    // Display connection state changes
    client.on('ConnectionStateChanged', function (state, reason) {
        console.log("State changed To: " + state + " Reason: " + reason)
    })

    // Set Signaling user ID
    options.uid = "1234"
    // Get Token
    options.token = await fetchToken(options.uid)
    // Log in to Signaling
    await client.login(options)

    while (!stopped)
    {
        // Renew a token every 30 seconds for demonstration purposes.
    
        await sleep(3000)
        options.token = await fetchToken(options.uid)
        client.renewToken(options.token)

        let currentDate = new Date();
        let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

        console.log("Renew Signaling token at " + time)
    }

}

loginRTM()
