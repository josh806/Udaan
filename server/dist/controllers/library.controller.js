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
exports.addLessonId = void 0;
const database_1 = require("../database");
const addLessonId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        const library = yield database_1.prisma.library.findUnique({
            where: {
                id: req.params.id,
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
        const updatedLibrary = yield database_1.prisma.user.update({
            where: {
                id: req.params.id,
            },
            data: {
                lessons: {
                    set: [...lessonIds, { id: +req.params.lessonId }]
                }
            }
        });
        console.log(updatedLibrary);
        res.send(updatedLibrary);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.status(400).send({ error: error });
    }
});
exports.addLessonId = addLessonId;
