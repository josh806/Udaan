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
exports.deleteLesson = exports.getLessons = exports.addLessonId = void 0;
exports.deleteLessonFromLibrary = exports.getNotes = exports.getLessons = exports.addLessonId = void 0;
const database_1 = require("../database");
const addLessonId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const library = yield database_1.prisma.library.findUnique({
            where: {
                userId: String(req.params.id),
            },
            select: {
                lessons: true,
            }
        });
        if (!library) {
            throw new Error();
        }
        console.log(library);
        const lessonIds = library.lessons.map(el => ({ id: el.id }));
        yield database_1.prisma.user.update({
            where: {
                id: req.params.id,
            },
            data: {
                lessons: {
                    set: [...lessonIds, { id: req.params.lessonId }]
                }
            }
        });
        const updatedLibrary = yield database_1.prisma.library.update({
            where: {
                userId: String(req.params.id),
            },
            data: {
                lessons: {
                    set: [...lessonIds, { id: req.params.lessonId }]
                }
            }
        });
        res.status(201).send(updatedLibrary);
    }
    catch (error) {
        console.error(error);
        res.status(400).send({ error: error });
    }
});
exports.addLessonId = addLessonId;
const getLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const library = yield database_1.prisma.library.findUnique({
            where: {
                userId: String(req.params.id),
            },
            include: {
                lessons: true
            }
        });
        res.status(200).send(library === null || library === void 0 ? void 0 : library.lessons);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Library doesnt find');
    }
});
exports.getLessons = getLessons;
// const getNotes = async (req: Request, res: Response) => {
//   try {
//     const library = await prisma.library.findUnique({
//       where: {
//         userId: String(req.params.id),
//       },
//       select: {
//         notes: true,
//       }
//     });
//     res.status(200).send(library);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Library not found');
//   }
// };
const deleteLessonFromLibrary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const library = yield database_1.prisma.library.findUnique({
            where: {
                userId: String(req.params.id),
            },
            include: {
                lessons: true
            },
        });
        if (!library) {
            res.status(404).send(`Library with ID ${req.params.id} not found`);
        }
        const updatedLibrary = yield database_1.prisma.library.update({
            where: {
                userId: String(req.params.id)
            },
            data: {
                lessons: {
                    disconnect: {
                        id: req.params.lessonId
                    }
                }
            }
        });
        res.status(200).send(updatedLibrary);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server problem');
    }
});
exports.deleteLesson = deleteLesson;
