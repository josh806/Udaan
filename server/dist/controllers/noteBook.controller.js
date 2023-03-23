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
exports.createNote = void 0;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const data = req.body;
    console.log(data);
    // try {
    //   const newPost = await prisma.noteBook.create({
    //     data: {
    //       name,
    //       date: new Date(),
    //       subjectId
    //     }
    //   });
    //   res.status(201);
    //   res.send(newPost);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send({ error: error });
    // }
});
exports.createNote = createNote;
