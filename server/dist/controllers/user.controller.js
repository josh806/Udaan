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
exports.addLessonId = exports.updateUser = exports.getUserByIdOrUsername = exports.createUser = void 0;
const database_1 = require("../database");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, username, student, schoolId } = req.body;
    if (firstName && lastName && email && username && student !== undefined && schoolId) {
        try {
            const newUser = yield database_1.prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    username,
                    student,
                    schoolId,
                    // lessons: {
                    //   create: [],
                    // }
                }
            });
            // const newLibrary = await prisma.library.create({
            //   data: {
            //     userId: newUser.id
            //   }
            // });
            // await prisma.$transaction(
            //   newUser.lessons.map((lesson) => {
            //     return prisma.lesson.update({
            //       where: {
            //         id: lesson.id
            //       },
            //       data: {
            //         library: {
            //           connect: {
            //             id: newLibrary.id
            //           }
            //         }
            //       }
            //     });
            //   })
            // );
            res.status(201);
            res.send(newUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: error });
        }
    }
    else {
        res.status(400).send('Parameter missing to create a new user');
    }
});
exports.createUser = createUser;
const getUserByIdOrUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.prisma.user.findFirst({
            where: {
                OR: [
                    { id: req.params.unique },
                    { username: req.params.unique },
                ]
            }
        });
        if (!user) {
            throw new Error();
        }
        res.send(user);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.status(400).send({ error: 'User not found' });
    }
});
exports.getUserByIdOrUsername = getUserByIdOrUsername;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const key = Object.keys(req.body)[0];
        if (key !== 'email' && key !== 'student' && key !== 'schoolId') {
            const user = yield database_1.prisma.user.update({
                where: { id: String(id) },
                data: req.body
            });
            res.status(200);
            res.send(user);
        }
        else {
            res.status(401).send({ error: 'Cannot update this property' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send({ error: 'Could not update the user' });
    }
});
exports.updateUser = updateUser;
const addLessonId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        // const user = await prisma.user.update({
        const user = yield database_1.prisma.user.findUnique({
            where: {
                id: req.params.id,
            },
            // data: {
            //   lessons: { upsert: {id: 3}},
            // },
            select: {
                lessons: true,
            }
        });
        if (!user) {
            throw new Error();
        }
        // if (user) {
        console.log(user);
        const lessonIds = user.lessons.map(el => ({ id: el.id }));
        //   // user.lesson.push(req.params.lessonId);
        const updatedUser = yield database_1.prisma.user.update({
            data: {
                lessons: {
                    set: [...lessonIds, { id: +req.params.lessonId }]
                }
            },
            where: {
                id: req.params.id,
            },
        });
        //   // console.log(updatedUser);
        //   res.send(updatedUser);
        // }
        res.send(updatedUser);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.status(400).send({ error: error });
    }
});
exports.addLessonId = addLessonId;
