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
exports.createSchool = void 0;
const database_1 = require("../database");
const createSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Creating school');
    const { name, email } = req.body;
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
        res.status(300);
    }
});
exports.createSchool = createSchool;
