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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//Mock data:
// async function main() {
//   // await prisma.user.createMany({
//   //   data: [
//   //     {
//   //       firstName: 'Victor',
//   //       lastName: 'Losada',
//   //       email: 'victor@losada.com.br',
//   //       username: 'Vlosada',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //     {
//   //       firstName: 'Valentin',
//   //       lastName: 'Gaugain',
//   //       email: 'val@gaugain.com.fr',
//   //       username: 'Vgaugain',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //     {
//   //       firstName: 'Josh',
//   //       lastName: 'McCarthy',
//   //       email: 'josh@mccarthy.com.nz',
//   //       username: 'JMcCarthy',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //     {
//   //       firstName: 'Joshua',
//   //       lastName: 'Thomas',
//   //       email: 'joshua@thomas.com.hd',
//   //       username: 'Jthomas',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //     {
//   //       firstName: 'Joaquin',
//   //       lastName: 'Buxó',
//   //       email: 'joaquin@buxo.com.es',
//   //       username: 'Jbuxó',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //     {
//   //       firstName: 'Yacine',
//   //       lastName: 'Kadri',
//   //       email: 'yacine@kadri.com.fr',
//   //       username: 'Ykadri',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //   ]
//   // })
//   // await prisma.subject.createMany({
//   //   data: [
//   //     {
//   //       name: 'Javascript',
//   //       schoolId: 1
//   //     },
//   //     {
//   //       name: 'Typescript',
//   //       schoolId: 1
//   //     },
//   //   ]
//   // })
//   // await prisma.lesson.createMany({
//   //   data: [
//   //     {
//   //       name: 'Introduction',
//   //       subjectId: 1
//   //     },
//   //     {
//   //       name: 'Basics',
//   //       subjectId: 1
//   //     },
//   //     {
//   //       name: 'Advanced',
//   //       subjectId: 1
//   //     },
//   //     {
//   //       name: 'Project',
//   //       subjectId: 1
//   //     },
//   //     {
//   //       name: 'Introduction',
//   //       subjectId: 2
//   //     },
//   //     {
//   //       name: 'Basics',
//   //       subjectId: 2
//   //     },
//   //     {
//   //       name: 'Advanced',
//   //       subjectId: 2
//   //     },
//   //     {
//   //       name: 'Project',
//   //       subjectId: 2
//   //     },
//   //   ]
//   // })
//   // const allSchools = await prisma.school.findMany({
//   //   include: {
//   //     users: true,
//   //     subjects: true
//   //   },
//   // })
//   // console.dir(allSchools, {depth:null})
// }
// main()
// .then(async () => {
//   await prisma.$disconnect()
// })
// .catch(async (e) => {
//   console.error(e)
//   await prisma.$disconnect()
//   process.exit(1)
// })
//School controller:
const createSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSchool = yield prisma.school.create({
            data: req.body,
        });
        res.status(201);
        res.send(newSchool);
    }
    catch (error) {
        console.error(error);
    }
});
//User controller: 
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield prisma.user.create({
            data: req.body,
        });
        res.status(201);
        res.send(newUser);
    }
    catch (error) {
        console.error(error);
    }
});
const updateUserAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToUpdate = yield prisma.user.update({
            where: { id: req.body.id },
            data: {
                avatar: req.body.avatar
            }
        });
    }
    catch (error) {
        console.error(error);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToDelete = yield prisma.user.delete({
            where: { id: req.body.id }
        });
    }
    catch (error) {
        console.error(error);
    }
});
//Subject controller
const createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSubject = yield prisma.subject.create({
            data: req.body
        });
        res.status(201);
        res.send(newSubject);
    }
    catch (error) {
        console.error(error);
    }
});
//Lessons controllers
const createLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLesson = yield prisma.lesson.create({
            data: req.body
        });
        res.status(201);
        res.send(newLesson);
    }
    catch (error) {
        console.error(error);
    }
});
