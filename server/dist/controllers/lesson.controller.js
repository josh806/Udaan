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
exports.updateLesson = exports.getLesson = exports.deleteLesson = exports.createLesson = void 0;
const database_1 = require("../database");
const createLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name.toLowerCase().trim();
    const { subjectId } = req.body;
    console.log(req.body);
    if (name && subjectId) {
        try {
            const newLesson = yield database_1.prisma.lesson.create({
                data: {
                    name,
                    subjectId
                },
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
    const lessonId = req.params.lessonId;
    try {
        const lesson = yield database_1.prisma.lesson.delete({
            where: {
                id: lessonId,
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
            id: req.params.lessonId,
        },
    });
    res.status(200).send(lesson);
});
exports.getLesson = getLesson;
const updateLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const updatedLesson = yield database_1.prisma.lesson.updateMany({
        where: {
            id: req.params.lessonId,
        },
        data: {
            video: req.body.video,
            drawing: req.body.drawing
        }
    });
    res.status(201).send(updatedLesson);
});
exports.updateLesson = updateLesson;
