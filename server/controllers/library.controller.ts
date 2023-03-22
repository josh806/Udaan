import { Request, Response } from 'express';
import { prisma } from '../database';

const addLessonId = async (req: Request, res: Response) => {
  console.log(req.params);
  try {
    const library = await prisma.library.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        lessons: true,
      }
    });
    if (!library) { throw new Error(); }
    console.log(library);
    const lessonIds = library.lessons.map(el => ({ id: el.id }));
    const updatedLibrary = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        lessons: {
          set : [...lessonIds, {id: +req.params.lessonId}]
        }
      }
    });
    console.log(updatedLibrary);
    res.send(updatedLibrary);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error });
  }
};

export { addLessonId };