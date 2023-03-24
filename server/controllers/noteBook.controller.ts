import { Request, Response } from 'express';
import { prisma } from '../database';

const createNote = async (req: Request, res: Response) => {
  const { userId, lessonId, name, note } = req.body;
  try {
    const library = await prisma.library.findUnique({
      where: {
        userId: userId,
      },
      include: {
        lessons:true
      }
    });
    if (!library) { throw new Error(); }
    const hasLesson = library.lessons.some(noteBook => noteBook.id === lessonId);
    if (!hasLesson) { throw new Error('user doesnt have this noteBook'); }
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



// router.get('/noteBook/:userId/:lessonId', noteBookController.getOneLessonNote);


const getOneLessonNote = async (req: Request, res: Response) => {
  console.log(req.params);
  const { userId, lessonId } = req.params;

  const libraryId = await prisma.library.findUnique({
    where: {
      userId: userId,
    },
    select: {
      id:true
    }
  });

  console.log(typeof libraryId);
  if (!libraryId) { throw new Error(); }

  // const noteBook = await prisma.noteBook.findUnique({
  //   where: {
  //     // id: '2d0d1dbb-986d-409e-a63a-a35249d5e1cd'
  //     libraryId: 2,
  //   },
  // });
  // res.status(200).send(noteBook);
};


// const deleteNote = async (req: Request, res: Response) => {
//   const lessonId = req.params.id;
//   try {
//     const noteBook = await prisma.noteBook.delete({
//       where: {
//         id: lessonId,
//       },
//     });
//     res.status(200).send(noteBook);
//   } catch (error) {
//     console.error(error);
//     res.status(404).send('Lesson not found');
//   }
// };


export { createNote, getOneLessonNote};