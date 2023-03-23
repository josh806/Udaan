import { Request, Response } from 'express';
import { prisma } from '../database';

const createNote = async (req: Request, res: Response) => {
  const { userId, lessonId, name, note } = req.body;
  const library = await prisma.library.findUnique({
    where: {
      userId: userId,
    },
    include: {
      lessons:true
    }
  });

  console.log(library);
  try {
    if (!library) { throw new Error(); }
    const hasLesson = library.lessons.some(lesson => lesson.id === lessonId);
    console.log(hasLesson);
    if (!hasLesson) { throw new Error('user doesnt have this lesson'); }
    const newNote = await prisma.noteBook.create({
      data: {
        libraryId: library.id,
        lessonId,
        name,
        note
      }
    });
    res.status(201);
    res.send(newNote);
  } catch (error) {
    console.error(error, 'hello');
    res.status(500).send( `${ error }` );
  }
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