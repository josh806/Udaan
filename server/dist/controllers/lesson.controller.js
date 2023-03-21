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
exports.createLesson = void 0;
const database_1 = require("../database");
const createLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, recording, subjectId } = req.body;
    console.log(req.body);
    if (name && subjectId) {
        try {
            const newLesson = yield database_1.prisma.lesson.create({
                data: {
                    name,
                    date: new Date(),
                    recording,
                    subjectId
                }
            });
            res.status(201);
            res.send(newLesson);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Server problem' });
        }
    }
    else {
        res.status(400).send('Parameter missing to create a new lesson');
    }
});
exports.createLesson = createLesson;
