import { Request, Response } from 'express';
import { prisma } from '../database';

const createNote = async (req: Request, res: Response) => {
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
};

// const deleteNote = async (req: Request, res: Response) => {
//   const lessonId = req.params.id;
//   try {
//     const lesson = await prisma.lesson.delete({
//       where: {
//         id: lessonId,
//       },
//     });
//     res.status(200).send(lesson);
//   } catch (error) {
//     console.error(error);
//     res.status(404).send('Lesson not found');
//   }
// };

// const getNote = async (req: Request, res: Response) => {
//   const lesson = await prisma.lesson.findUnique({
//     where: {
//       id: req.params.id,
//     },
//   });
//   res.status(200).send(lesson);
// };

export { createNote };