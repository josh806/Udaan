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
exports.deleteSubject = exports.createSubject = void 0;
const database_1 = require("../database");
const createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name.toLowerCase().trim();
    const schoolId = req.body.schoolId;
    if (name && schoolId) {
        try {
            const newSubject = yield database_1.prisma.subject.create({
                data: {
                    name,
                    schoolId
                }
            });
            res.status(201);
            res.send(newSubject);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Server problem' });
        }
    }
    else {
        res.status(400).send('Parameter missing to create a new subject');
    }
});
exports.createSubject = createSubject;
const deleteSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectId = req.params.id;
    console.log(req.params.id);
    try {
        const subject = yield database_1.prisma.subject.delete({
            where: {
                id: Number(subjectId),
            },
        });
        res.status(200).send(subject);
    }
    catch (error) {
        console.error(error);
        res.status(404).send('Subject not found');
    }
});
exports.deleteSubject = deleteSubject;
