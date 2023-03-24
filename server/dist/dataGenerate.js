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
const database_1 = require("./database");
function generateDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const newSchool = yield database_1.prisma.school.create({
            data: {
                name: 'Code',
                email: 'code@code.com',
            },
        });
        const newUser1 = yield database_1.prisma.user.create({
            data: {
                id: 'abcd1',
                firstName: 'Victor',
                lastName: 'Losada',
                email: 'victor@losada.com.br',
                username: 'Vlosada',
                student: true,
                schoolId: newSchool.id,
            },
        });
        const library1 = {
            userId: newUser1 === null || newUser1 === void 0 ? void 0 : newUser1.id,
        };
        yield database_1.prisma.library.create({ data: library1 });
        const newUser2 = yield database_1.prisma.user.create({
            data: {
                id: 'abcd2',
                firstName: 'Joaquin',
                lastName: 'Buxó',
                email: 'joaquin@buxó.com.es',
                username: 'Jbuxó',
                student: true,
                schoolId: newSchool.id,
            },
        });
        const library2 = {
            userId: newUser2 === null || newUser2 === void 0 ? void 0 : newUser2.id,
        };
        yield database_1.prisma.library.create({ data: library2 });
        const newUser3 = yield database_1.prisma.user.create({
            data: {
                id: 'abcd3',
                firstName: 'Valentin',
                lastName: 'Gaulg',
                email: 'val@gaulg.com.fr',
                username: 'Vgaulg',
                student: true,
                schoolId: newSchool.id,
            },
        });
        const library3 = {
            userId: newUser3 === null || newUser3 === void 0 ? void 0 : newUser3.id,
        };
        yield database_1.prisma.library.create({ data: library3 });
        const newUser4 = yield database_1.prisma.user.create({
            data: {
                id: 'abcd4',
                firstName: 'Josh',
                lastName: 'McCarthy',
                email: 'josh@mccarthy.com.nz',
                username: 'JmcCarthy',
                student: true,
                schoolId: newSchool.id,
            },
        });
        const library4 = {
            userId: newUser4 === null || newUser4 === void 0 ? void 0 : newUser4.id,
        };
        yield database_1.prisma.library.create({ data: library4 });
        const newUser5 = yield database_1.prisma.user.create({
            data: {
                id: 'abcd5',
                firstName: 'Joshua',
                lastName: 'Thomas',
                email: 'josh@thomas.com',
                username: 'Jthomas',
                student: true,
                schoolId: newSchool.id,
            },
        });
        const library5 = {
            userId: newUser5 === null || newUser5 === void 0 ? void 0 : newUser5.id,
        };
        yield database_1.prisma.library.create({ data: library5 });
        const newUser6 = yield database_1.prisma.user.create({
            data: {
                id: 'abcd6',
                firstName: 'Yacine',
                lastName: 'Kadri',
                email: 'yacine@kadri.com.fr',
                username: 'Ykadri',
                student: true,
                schoolId: newSchool.id,
            },
        });
        const library6 = {
            userId: newUser6 === null || newUser6 === void 0 ? void 0 : newUser6.id,
        };
        yield database_1.prisma.library.create({ data: library6 });
        yield database_1.prisma.user.create({
            data: {
                id: 'abcd7',
                firstName: 'Guillem',
                lastName: 'Sardà',
                email: 'guillem@codeworks.com',
                username: 'Gsardà',
                student: false,
                schoolId: newSchool.id,
            },
        });
        const newSubject = yield database_1.prisma.subject.create({
            data: {
                name: 'Javascript',
                schoolId: newSchool.id,
            },
        });
        yield database_1.prisma.lesson.createMany({
            data: [
                {
                    name: 'Class 1',
                    subjectId: newSubject.id,
                },
                {
                    name: 'Class 2',
                    subjectId: newSubject.id,
                },
                {
                    name: 'Class 3',
                    subjectId: newSubject.id,
                },
            ],
        });
    });
}
generateDatabase()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield database_1.prisma.$disconnect();
    process.exit(1);
}));
