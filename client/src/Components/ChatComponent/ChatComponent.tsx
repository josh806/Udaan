import React from 'react';
import './ChatComponent.css';

import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

const chatClient = new StreamChat('dz5f4d5kzrue');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibGl0dGxlLWJ1dHRlcmZseS01IiwiZXhwIjoxNjc5NzIwMDY3fQ.qZC-rI4nLxIOz8sFAAdE3Gd8m5GocyKT8eSFOo75DwM';

chatClient.connectUser(
  {
    id: 'little-butterfly-5',
    name: 'little',
    image: 'https://getstream.io/random_png/?id=little-butterfly-5&name=little',
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'Talk about React',
  members: ['little-butterfly-5'],
});

const ChatComponent = () => (
  <Chat client={chatClient} theme='str-chat__theme-light'>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default ChatComponent; 