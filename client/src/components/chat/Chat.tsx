// import react from 'react';
// import AC, { AgoraChat } from 'agora-chat'
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { createChatUser, getUser } from './chat.service';


// export const Chat: React.FC = () => {
//     const user = useSelector((state: RootState) => state.users);
//     const [chatUser, setChatUser] = react.useState<any>(null);
//     console.log(user)

//     const handleChat = async () => {
//         const chatUser = await getUser(user);
//         console.log(chatUser)
//         if (chatUser.entities[0].username !== `user_${user.username}`) {
//             const newChatUser = await createChatUser(user);
//             return newChatUser
//         };
//         console.log('not created')
//         setChatUser(chatUser.entities[0].username)
//     }




//     // Replaces <Your app key> with your app key.
//     const appKey = "71932447#1089542";
//     // Initializes the Web client.
//     const conn = new AC.connection({
//         appKey: appKey,
//     });
//     // Adds the event handler.
//     conn.addEventHandler("connection&message", {
//         // Occurs when the app is connected to Agora Chat.
//         onConnected: () => {
//             document
//                 .getElementById("log")
//                 .appendChild(document.createElement("div"))
//                 .append("Connect success !");
//         },
//         // Occurs when the app is disconnected from Agora Chat.
//         onDisconnected: () => {
//             document
//                 .getElementById("log")
//                 .appendChild(document.createElement("div"))
//                 .append("Logout success !");
//         },
//         // Occurs when a text message is received.
//         onTextMessage: (message) => {
//             console.log(message);
//             document
//                 .getElementById("log")
//                 .appendChild(document.createElement("div"))
//                 .append("Message from: " + message.from + " Message: " + message.msg);
//         },
//         // Occurs when the token is about to expire.
//         onTokenWillExpire: (params) => {
//             document
//                 .getElementById("log")
//                 .appendChild(document.createElement("div"))
//                 .append("Token is about to expire");
//         },
//         // Occurs when the token has expired. 
//         onTokenExpired: (params) => {
//             document
//                 .getElementById("log")
//                 .appendChild(document.createElement("div"))
//                 .append("The token has expired");
//         },
//         onError: (error) => {
//             console.log("on error", error);
//         },
//     });

//     // Defines the functions of the buttons.
//     window.onload = function () {
//         // Logs into Agora Chat.
//         document.getElementById("login").onclick = function () {
//             document
//                 .getElementById("log")
//                 .appendChild(document.createElement("div"))
//                 .append("Logging in...");
//             const userId = document.getElementById("userID").value.toString();
//             const token = document.getElementById("token").value.toString();
//             conn.open({
//                 user: userId,
//                 agoraToken: token,
//             });
//         };
//         // Logs out.
//         document.getElementById("logout").onclick = function () {
//             conn.close();
//             document
//                 .getElementById("log")
//                 .appendChild(document.createElement("div"))
//                 .append("logout");
//         };
//         // Sends a peer-to-peer message.
//         document.getElementById("send_peer_message").onclick = function () {
//             let peerId = document.getElementById("peerId").value.toString();
//             let peerMessage = document.getElementById("peerMessage").value.toString();
//             let option = {
//                 chatType: "singleChat", // Sets the chat type as single chat.
//                 type: "txt", // Sets the message type.
//                 to: peerId, // Sets the recipient of the message with user ID.
//                 msg: peerMessage, // Sets the message content.
//             };
//             let msg = AC.message.create(option);
//             conn
//                 .send(msg)
//                 .then((res) => {
//                     console.log("send private text success");
//                     document
//                         .getElementById("log")
//                         .appendChild(document.createElement("div"))
//                         .append("Message send to: " + peerId + " Message: " + peerMessage);
//                 })
//                 .catch(() => {
//                     console.log("send private text fail");
//                 });
//         };
//     };







//     return (
//         <>
//             <h2>Chat</h2>
//             <form id="loginForm">
//                 <div className="input-field">
//                     <label>User ID</label>
//                     <input type="text" placeholder="User ID" id="userID" />
//                 </div>
//                 <div className="input-field">
//                     <label>Token</label>
//                     <input type="text" placeholder="Token" id="token" />
//                 </div>
//                 <div>
//                     <button type="button" id="login">Login</button>
//                     <button type="button" id="logout">Logout</button>
//                 </div>
//                 <div className="input-field">
//                     <label>Peer user ID</label>
//                     <input type="text" placeholder="Peer user ID" id="peerId" />
//                 </div>
//                 <div className="input-field">
//                     <label>Peer Message</label>
//                     <input type="text" placeholder="Peer message" id="peerMessage" />
//                     <button type="button" id="send_peer_message">send</button>
//                 </div>
//             </form>
//             <button onClick={handleChat}>
//                Connect Chat
//             </button>
//             <hr />
//             <div id="log"></div>
//         </>
//     )
// }


import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';

export const  Chat: React.FC = () => {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: '1',
        name: 'Henry Mill',
        email: 'henrymill@example.com',
        photoUrl: 'https://ibb.co/8z7wPzn',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const otherUser = new Talk.User({
        id: '2',
        name: 'Teacher',
        email: 'jessicawells@example.com',
        photoUrl: 'https://i.ibb.co/7g1Drgx/IMG-5196.jpg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 'twO8fogk',
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return <div ref={chatboxEl} />;
}

