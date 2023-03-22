import { Request, Response } from 'express';
import { prisma } from '../database';

const addLessonId = async (req: Request, res: Response) => {
  console.log(req.params);
  try {
    const library = await prisma.library.findUnique({
      where: {
        userId: String(req.params.id),
      },
      select: {
        lessons: true,
      }
    });
    if (!library) { throw new Error(); }
    console.log(library);
    const lessonIds = library.lessons.map(el => ({ id: el.id }));
    await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        lessons: {
          set : [...lessonIds, {id: +req.params.lessonId}]
        }
      }
    });
    const updatedLibrary = await prisma.library.update({
      where: {
        userId: String(req.params.id),
      },
      data: {
        lessons: {
          set: [...lessonIds, {id: +req.params.lessonId}]
        }
      }
    });
    res.status(201).send(updatedLibrary);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error });
  }
};

const getLessons = async (req:Request, res:Response) => {
  try {
    const library = await prisma.library.findUnique({
      where: {
        userId: String(req.params.id),
      },
      include: {
        lessons: true
      }
    });
    
    res.status(200).send(library?.lessons);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Library doesnt find');
  }
};


const getNotes = async (req: Request, res: Response) => {
  try {
    const library = await prisma.library.findUnique({
      where: {
        userId: String(req.params.id),
      },
      select: {
        notes: true,
      }
    });
    res.status(200).send(library);
  } catch (error) {
    console.error(error);
    res.status(500).send('Library not found');
  }
};




export { addLessonId, getLessons, getNotes };