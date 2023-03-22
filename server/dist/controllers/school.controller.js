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
exports.getSubjects = exports.getUsers = exports.createSchool = void 0;
const database_1 = require("../database");
const createSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const name = req.body.name.toLowerCase().trim();
    const email = req.body.email;
    if (name && email) {
        try {
            const newSchool = yield database_1.prisma.school.create({
                data: {
                    name,
                    email
                }
            });
            res.status(201);
            res.send(newSchool);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                error: error
            });
        }
    }
    else {
        res.status(404);
        res.send('Parameter missing to create a new school');
    }
});
exports.createSchool = createSchool;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const users = yield database_1.prisma.school.findMany({
            where: {
                id: Number(id),
            },
            include: {
                users: true
            }
        });
        res.status(200);
        res.send(users);
    }
    catch (error) {
        console.error(error);
        res.status(404).send({ error: 'Cant find school ID' });
    }
});
exports.getUsers = getUsers;
const getSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const subjects = yield database_1.prisma.school.findMany({
            where: {
                id: Number(id),
            },
            include: {
                subjects: true
            }
        });
        res.status(200);
        res.send(subjects);
    }
    catch (error) {
        console.error(error);
        res.status(404).send({ error: 'Cant find school ID' });
    }
});
exports.getSubjects = getSubjects;
