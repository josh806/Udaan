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
exports.generateDatabase = void 0;
const database_1 = require("./database");
function generateDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const newSchool = yield database_1.prisma.school.create({
            data: {
                id: '1',
                name: 'Code',
                email: 'code@code.com',
            },
        });
        const newUser1 = yield database_1.prisma.user.create({
            data: {
                id: 'auth0|641f0fdde1118da83ff1343b',
                firstName: 'Victor',
                lastName: 'Losada',
                email: 'vlosada77@gmail.com',
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
                id: 'auth0|641f113068011b5232bd21c5',
                firstName: 'Joaquin',
                lastName: 'Buxó',
                email: 'jamesbond1@gmail.com',
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
                id: 'auth0|641d9849f939365a568f0200',
                firstName: 'Valentin',
                lastName: 'Gaulg',
                email: 'val@hotmail.fr',
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
                id: 'auth0|641b5eb119607078dd5ad62c',
                firstName: 'Josh',
                lastName: 'McCarthy',
                email: 'joaquintest@123.com',
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
                id: 'auth0|641f1768f939365a568f1e3f',
                firstName: 'Joshua',
                lastName: 'Thomas',
                email: 'joshtest5@test.com',
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
                id: 'auth0|64188241739976b7470d8e04',
                firstName: 'Yacine',
                lastName: 'Kadri',
                email: 'hellotest@hello.com',
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
                id: 'auth0|641f0e0368011b5232bd21a4',
                firstName: 'Guillem',
                lastName: 'Sardà',
                email: 'josh@thomas.com',
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
                    scheduledDate: '21/04/2023',
                    subjectId: newSubject.id,
                },
                {
                    name: 'Class 2',
                    scheduledDate: '22/04/2023',
                    subjectId: newSubject.id,
                },
                {
                    name: 'Class 3',
                    scheduledDate: '23/04/2023',
                    subjectId: newSubject.id,
                },
            ],
        });
    });
}
exports.generateDatabase = generateDatabase;
// generateDatabase()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
