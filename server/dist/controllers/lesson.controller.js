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
exports.getLesson = exports.deleteLesson = exports.createLesson = void 0;
const database_1 = require("../database");
const createLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name.toLowerCase().trim();
    const { recording, subjectId } = req.body;
    console.log(req.body);
    if (name && subjectId && recording !== undefined) {
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
            res.status(500).send({ error: error });
        }
    }
    else {
        res.status(400).send('Parameter missing to create a new lesson');
    }
});
exports.createLesson = createLesson;
const deleteLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonId = req.params.id;
    try {
        const lesson = yield database_1.prisma.lesson.delete({
            where: {
                id: Number(lessonId),
            },
        });
        res.status(200).send(lesson);
    }
    catch (error) {
        console.error(error);
        res.status(404).send('Lesson not found');
    }
});
exports.deleteLesson = deleteLesson;
const getLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield database_1.prisma.lesson.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });
    res.status(200).send(lesson);
});
exports.getLesson = getLesson;
