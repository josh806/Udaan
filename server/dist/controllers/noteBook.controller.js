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
exports.updateNote = exports.deleteNote = exports.getAllUserNotes = exports.getOneLessonNote = exports.createNote = void 0;
const database_1 = require("../database");
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, lessonId, name, note } = req.body;
    try {
        const library = yield database_1.prisma.library.findUnique({
            where: {
                userId: userId,
            },
            include: {
                lessons: true
            }
        });
        if (!library) {
            throw new Error('library or user doesnt exist');
        }
        const hasLesson = library.lessons.some(noteBook => noteBook.id === lessonId);
        if (!hasLesson) {
            throw new Error('user doesnt have this lesson');
        }
        const newNote = yield database_1.prisma.noteBook.create({
            data: {
                libraryId: library.id,
                lessonId,
                name,
                note
            }
        });
        res.status(201);
        res.send(newNote);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`${error}`);
    }
});
exports.createNote = createNote;
const getOneLessonNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, lessonId } = req.params;
    try {
        const libraryId = yield database_1.prisma.library.findUnique({
            where: {
                userId: userId,
            },
            select: {
                id: true
            }
        });
        if (!libraryId) {
            throw new Error('no library found');
        }
        const noteBook = yield database_1.prisma.noteBook.findUnique({
            where: {
                libraryId_lessonId: {
                    libraryId: libraryId.id,
                    lessonId: lessonId,
                },
            },
        });
        res.status(200).send(noteBook);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`${error}`);
    }
});
exports.getOneLessonNote = getOneLessonNote;
const getAllUserNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const library = yield database_1.prisma.library.findUnique({
            where: {
                userId: userId,
            },
            select: {
                Notes: true
            }
        });
        if (!library) {
            throw new Error('no library found');
        }
        res.status(200).send(library);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`${error}`);
    }
});
exports.getAllUserNotes = getAllUserNotes;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, lessonId } = req.params;
    try {
        const libraryId = yield database_1.prisma.library.findUnique({
            where: {
                userId: userId,
            },
            select: {
                id: true
            }
        });
        if (!libraryId) {
            throw new Error('no library found');
        }
        const noteBook = yield database_1.prisma.noteBook.delete({
            where: {
                libraryId_lessonId: {
                    libraryId: libraryId.id,
                    lessonId: lessonId,
                },
            },
        });
        res.status(200).send(noteBook);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`${error}`);
    }
});
exports.deleteNote = deleteNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, lessonId } = req.body;
    const data = req.body;
    delete data['userId'];
    delete data['lessonId'];
    try {
        const libraryId = yield database_1.prisma.library.findUnique({
            where: {
                userId: userId,
            },
            select: {
                id: true
            }
        });
        if (!libraryId) {
            throw new Error('no library found');
        }
        const noteBook = yield database_1.prisma.noteBook.update({
            where: {
                libraryId_lessonId: {
                    libraryId: libraryId.id,
                    lessonId: lessonId,
                },
            },
            data: data
        });
        res.status(200).send(noteBook);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`${error}`);
    }
});
exports.updateNote = updateNote;
