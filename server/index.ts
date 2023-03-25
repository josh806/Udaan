import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './router';
import { monitor } from '@colyseus/monitor';
import { MySchool } from './colyseus/MySchool';
import { Server } from 'colyseus';
import { createServer } from 'http';
import { WebSocketTransport } from '@colyseus/ws-transport';

const PORT = Number(process.env.PORT) || 3001;

const gamePort = 4001;

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

//colyseus multiplayer
const server = createServer();
const gameServer = new Server({
  transport: new WebSocketTransport({
    server, // provide the custom server for `WebSocketTransport`
  }),
});
gameServer.define('my_school', MySchool);
app.use('/colyseus', monitor());

gameServer.listen(gamePort);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
