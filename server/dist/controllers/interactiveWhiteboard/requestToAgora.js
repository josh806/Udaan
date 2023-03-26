"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRoomToken = exports.createRoom = void 0;
const createRoom = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = fetch('https://api.netless.link/v5/rooms', {
            method: 'POST',
            headers: {
                token: 'NETLESSSDK_YWs9Y2d4Y1NTVG1rN25neGpkSSZub25jZT1mYzY1NGIwMC1jNzE5LTExZWQtYWM2OS1mOTc2YTcxOTk1OWUmcm9sZT0wJnNpZz1hMTU0ZWRkZTM3ODAwYjBlNjY5Mzk4NjBiZGQxZDY0ZDMyMzIyMDkzMjFhOGI3ZTNlODkzNGJjYmYzNzRmYTli',
                'Content-Type': 'application/json',
                region: 'us-sv',
            },
            body: JSON.stringify({
                isRecord: false,
            }),
        });
        const data = yield response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createRoom = createRoom;
const generateRoomToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = fetch(`https://api.netless.link/v5/tokens/rooms/${id}`, {
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
        const token = yield response.json();
        console.log(token);
        return token;
    }
    catch (error) {
        console.log(error);
    }
});
exports.generateRoomToken = generateRoomToken;
