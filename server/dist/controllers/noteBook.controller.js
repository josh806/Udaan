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
exports.createNote = void 0;
const database_1 = require("../database");
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, lessonId, name, note } = req.body;
    const library = yield database_1.prisma.library.findUnique({
        where: {
            userId: userId,
        },
        include: {
            lessons: true
        }
    });
    console.log(library);
    try {
        if (!library) {
            throw new Error();
        }
        const hasLesson = library.lessons.some(lesson => lesson.id === lessonId);
        console.log(hasLesson);
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
        console.error(error, 'hello');
        res.status(500).send(`${error}`);
    }
});
exports.createNote = createNote;
