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
const createRoom = () => {
    const data = fetch('https://api.netless.link/v5/rooms', {
        method: 'POST',
        headers: {
            token: 'NETLESSSDK_YWs9Y2d4Y1NTVG1rN25neGpkSSZub25jZT1mYzY1NGIwMC1jNzE5LTExZWQtYWM2OS1mOTc2YTcxOTk1OWUmcm9sZT0wJnNpZz1hMTU0ZWRkZTM3ODAwYjBlNjY5Mzk4NjBiZGQxZDY0ZDMyMzIyMDkzMjFhOGI3ZTNlODkzNGJjYmYzNzRmYTli',
            'Content-Type': 'application/json',
            region: 'us-sv',
        },
        body: JSON.stringify({
            isRecord: false,
        }),
    })
        .then((response) => response.json())
        .then((res) => {
        return res;
    })
        .catch((error) => {
        console.log(error);
    });
    return data;
};
exports.createRoom = createRoom;
const generateRoomToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = fetch(`https://api.netless.link/v5/tokens/rooms/${id}`, {
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
        }).then((response) => response.json())
            .then((res) => {
            return res;
        });
        return token;
    }
    catch (error) {
        console.log(error);
    }
});
exports.generateRoomToken = generateRoomToken;
// const createRoom = async () => {
//   try {
//     const response: any = fetch('https://api.netless.link/v5/rooms', {
//       method: 'POST',
//       headers: {
//         'token':
//           'NETLESSSDK_YWs9T09mQkRRcTl0R2E5ZHFfZyZub25jZT1hZDg3NmM4MC1jYmViLTExZWQtYmM3Zi1mNTJjMTZjNzkzYzYmcm9sZT0wJnNpZz01OGRiNTFlYzQ5OWUzYzFjM2I4MzFmZDJjNmZjMGVjMDI3ZThkMjhjN2FjNWNhYzhkZTY5NWM5NDM3YzZlZjA5',
//         'Content-Type': 'application/json',
//         'region': 'us-sv',
//       },
//       body: JSON.stringify({
//         isRecord: false,
//       }),
//     });
//     console.log(response);
//     if (!response.ok) {
//       throw new Error(`Error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data); 
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const generateRoomToken = async (id: string) => {
//   try {
//     const response: any = fetch(`https://api.netless.link/v5/tokens/rooms/${id}`, {
//       method: 'POST',
//       headers: {
//         token: 'NETLESSSDK_YWs9T09mQkRRcTl0R2E5ZHFfZyZub25jZT1hZDg3NmM4MC1jYmViLTExZWQtYmM3Zi1mNTJjMTZjNzkzYzYmcm9sZT0wJnNpZz01OGRiNTFlYzQ5OWUzYzFjM2I4MzFmZDJjNmZjMGVjMDI3ZThkMjhjN2FjNWNhYzhkZTY5NWM5NDM3YzZlZjA5',
//         'Content-Type': 'application/json',
//         region: 'us-sv',
//       },
//       body: JSON.stringify({
//         'lifespan': 3600000,
//         'role': 'admin'
//       }),
//     });
//     const token = await response.json();
//     console.log(token); 
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export { createRoom, generateRoomToken };
