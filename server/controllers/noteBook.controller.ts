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
    if (!library) { throw new Error('library or user doesnt exist'); }
    const hasLesson = library.lessons.some(noteBook => noteBook.id === lessonId);
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
    console.error(error);
    res.status(500).send( `${ error }` );
  }
};

const getOneLessonNote = async (req: Request, res: Response) => {
  const { userId, lessonId } = req.params;
  try {
    const libraryId = await prisma.library.findUnique({
      where: {
        userId: userId,
      },
      select: {
        id: true
      }
    });

    if (!libraryId) { throw new Error('no library found'); }

    const noteBook = await prisma.noteBook.findUnique({
      where: {
        libraryId_lessonId: {
          libraryId: libraryId.id,
          lessonId: lessonId,
        },
      },
    });
    res.status(200).send(noteBook);
  } catch (error) {
    console.error(error);
    res.status(500).send( `${ error }` );
  }
};

const getAllUserNotes = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const library = await prisma.library.findUnique({
      where: {
        userId: userId,
      },
      select: {
        Notes: true
      }
    });
    if (!library) { throw new Error('no library found'); }
    res.status(200).send(library);
  } catch (error) {
    console.error(error);
    res.status(500).send( `${ error }` );
  }
};


const deleteNote = async (req: Request, res: Response) => {
  const { userId, lessonId } = req.params;
  try {
    const libraryId = await prisma.library.findUnique({
      where: {
        userId: userId,
      },
      select: {
        id: true
      }
    });

    if (!libraryId) { throw new Error('no library found'); }

    const noteBook = await prisma.noteBook.delete({
      where: {
        libraryId_lessonId: {
          libraryId: libraryId.id,
          lessonId: lessonId,
        },
      },
    });
    res.status(200).send(noteBook);
  } catch (error) {
    console.error(error);
    res.status(500).send( `${ error }` );
  }
};

const updateNote = async (req: Request, res: Response) => {
  const { userId, lessonId } = req.body;
  const data = req.body;
  delete data['userId'];
  delete data['lessonId'];

  try {
    const libraryId = await prisma.library.findUnique({
      where: {
        userId: userId,
      },
      select: {
        id: true
      }
    });

    if (!libraryId) { throw new Error('no library found'); }

    const noteBook = await prisma.noteBook.update({
      where: {
        libraryId_lessonId: {
          libraryId: libraryId.id,
          lessonId: lessonId,
        },
      },
      data: data
    });
    res.status(200).send(noteBook);
  } catch (error) {
    console.error(error);
    res.status(500).send( `${ error }` );
  }
};


export { createNote, getOneLessonNote, getAllUserNotes, deleteNote, updateNote};