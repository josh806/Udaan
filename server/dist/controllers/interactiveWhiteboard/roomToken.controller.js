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
exports.getTokenForStudent = exports.createOrGetToken = void 0;
const requestToAgora_1 = require("./requestToAgora");
const database_1 = require("../../database");
const whiteboardController = __importStar(require("./whiteboard.controller"));
const createOrGetToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 0. check if token already exists
        const hasToken = yield whiteboardController.getToken(req);
        if (!hasToken) {
            // 1. create a whiteboard room
            const data = yield (0, requestToAgora_1.createRoom)();
            req.body = data;
            // 2. store whiteboard session in db
            yield whiteboardController.createWhiteboard(req);
            // 3. create token
            const token = yield (0, requestToAgora_1.generateRoomToken)(data.uuid);
            req.body = token;
            // 4. store token in db
            yield whiteboardController.addToken(req, res);
        }
        else {
            res.send(hasToken);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }
});
exports.createOrGetToken = createOrGetToken;
const getTokenForStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonId = req.params.lessonId;
    try {
        const whiteBoard = yield database_1.prisma.whiteboard.findUnique({
            where: { lessonId: lessonId },
        });
        if (whiteBoard.token) {
            res.send(whiteBoard);
        }
        else {
            throw new Error;
        }
    }
    catch (error) {
        console.error(error);
        return res.send({ error: 'token or whiteboard doesnt exist' });
    }
});
exports.getTokenForStudent = getTokenForStudent;
