"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const monitor_1 = require("@colyseus/monitor");
const MySchool_1 = require("./colyseus/MySchool");
const colyseus_1 = require("colyseus");
const http_1 = require("http");
const ws_transport_1 = require("@colyseus/ws-transport");
const PORT = Number(process.env.PORT) || 3001;
const gamePort = 4001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.default);
//colyseus multiplayer
const server = (0, http_1.createServer)();
const gameServer = new colyseus_1.Server({
    transport: new ws_transport_1.WebSocketTransport({
        server, // provide the custom server for `WebSocketTransport`
    }),
});
gameServer.define('my_school', MySchool_1.MySchool);
app.use('/colyseus', (0, monitor_1.monitor)());
gameServer.listen(gamePort);
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
