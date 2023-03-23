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
const user_controller_1 = require("./user.controller");
const options = {
    method: "POST",
    url: "https://api.netless.link/v5/rooms",
    headers: {
        token: "NETLESSSDK_YWs9Y2d4Y1NTVG1rN25neGpkSSZub25jZT1mYzY1NGIwMC1jNzE5LTExZWQtYWM2OS1mOTc2YTcxOTk1OWUmcm9sZT0wJnNpZz1hMTU0ZWRkZTM3ODAwYjBlNjY5Mzk4NjBiZGQxZDY0ZDMyMzIyMDkzMjFhOGI3ZTNlODkzNGJjYmYzNzRmYTli",
        "Content-Type": "application/json",
        region: "us-sv",
    },
    body: JSON.stringify({
        isRecord: false,
    }),
};
const createWhiteboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = req.body;
        const id = room.uuid;
        console.log(room);
        const name = "Name" + id;
        const newWhiteboard = yield user_controller_1.prisma.whiteboard.create({
            data: {
                id: id,
                name: name,
            },
        });
        res.status(200);
        res.send(newWhiteboard);
    }
    catch (error) {
        console.log(error);
        res.status(300);
    }
});
const joinWhiteboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = 'f7ef7cb0c74d11ed85245975e226531a';
        const whiteboard = yield user_controller_1.prisma.whiteboard.findUnique({
            where: {
                id: id,
            },
        });
        res.status(200);
        res.send(whiteboard);
    }
    catch (error) {
        console.log(error);
        res.status(300);
    }
});
module.exports = { createWhiteboard, joinWhiteboard };
