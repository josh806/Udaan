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
exports.getOneLessonNote = exports.createNote = void 0;
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
        console.log(library.id);
        // console.log(lessonId);
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
        console.error(error, 'hello');
        res.status(500).send(`${error}`);
    }
});
exports.createNote = createNote;
// router.get('/noteBook/:userId/:lessonId', noteBookController.getOneLessonNote);
const getOneLessonNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const { userId, lessonId } = req.params;
    const libraryId = yield database_1.prisma.library.findUnique({
        where: {
            userId: userId,
        },
        select: {
            id: true
        }
    });
    console.log(typeof libraryId);
    if (!libraryId) {
        throw new Error();
    }
    // const noteBook = await prisma.noteBook.findUnique({
    //   where: {
    //     // id: '2d0d1dbb-986d-409e-a63a-a35249d5e1cd'
    //     libraryId: 2,
    //   },
    // });
    // res.status(200).send(noteBook);
});
exports.getOneLessonNote = getOneLessonNote;
