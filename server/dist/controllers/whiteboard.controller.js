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
exports.getToken = exports.addToken = exports.createWhiteboard = void 0;
const database_1 = require("../database");
const createWhiteboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonId = req.params.lessonId;
    const { uuid, teamUUID, appUUID, isBan, createdAt, limit } = req.body;
    try {
        const newWhiteBoard = yield database_1.prisma.whiteboard.create({
            data: {
                uuid,
                teamUUID,
                appUUID,
                isBan,
                createdAt,
                limit,
                lessonId
            }
        });
        res.status(201);
        res.send(newWhiteBoard);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }
});
exports.createWhiteboard = createWhiteboard;
const addToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lessonId = req.params.lessonId;
    const { token } = req.body;
    try {
        const whiteboardId = yield database_1.prisma.lesson.findUnique({
            where: {
                id: lessonId,
            },
            select: {
                whiteboard: {
                    select: {
                        uuid: true
                    }
                }
            }
        });
        if (!whiteboardId) {
            throw new Error('no whiteboard found for this lesson');
        }
        const uuid = (_a = whiteboardId === null || whiteboardId === void 0 ? void 0 : whiteboardId.whiteboard) === null || _a === void 0 ? void 0 : _a.uuid;
        const newWhiteBoard = yield database_1.prisma.whiteboard.update({
            where: { uuid: uuid },
            data: {
                token,
            }
        });
        if (!newWhiteBoard) {
            throw new Error('problem db server');
        }
        res.status(200);
        res.send(newWhiteBoard);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(`${error}`);
    }
});
exports.addToken = addToken;
const getToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const lessonId = req.params.lessonId;
    try {
        const whiteboardId = yield database_1.prisma.lesson.findUnique({
            where: {
                id: lessonId,
            },
            select: {
                whiteboard: {
                    select: {
                        uuid: true
                    }
                }
            }
        });
        if (!whiteboardId) {
            throw new Error('no whiteboard found for this lesson');
        }
        const uuid = (_b = whiteboardId === null || whiteboardId === void 0 ? void 0 : whiteboardId.whiteboard) === null || _b === void 0 ? void 0 : _b.uuid;
        const whiteBoard = yield database_1.prisma.whiteboard.findUnique({
            where: { uuid: uuid },
        });
        if (!whiteBoard) {
            throw new Error('problem db server');
        }
        res.status(200);
        res.send(whiteBoard);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(`${error}`);
    }
});
exports.getToken = getToken;
