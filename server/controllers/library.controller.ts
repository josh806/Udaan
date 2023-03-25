import { Request, Response } from 'express';
import { prisma } from '../database';

const addLessonId = async (req: Request, res: Response) => {
  const { userId, lessonId } = req.params;
  try {
    const library = await prisma.library.findUnique({
      where: {
        userId: userId,
      },
      select: {
        lessons: true,
      },
    });
    if (!library) {
      throw new Error('library or user doesnt exist');
    }
    const filterLessons = library.lessons.filter((lesson) => lesson.id === lessonId);
    if (filterLessons.length) {
      throw new Error('lesson already exists');
    }
    const lessonIds = library.lessons.map((el) => ({ id: el.id }));
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        lessons: {
          set: [...lessonIds, { id: lessonId }],
        },
      },
    });
    const updatedLibrary = await prisma.library.update({
      where: {
        userId: userId,
      },
      data: {
        lessons: {
          set: [...lessonIds, { id: lessonId }],
        },
      },
    });

    //----------------- create a noteBook ----------------------------
    console.log(updatedLibrary);

    const library2 = await prisma.library.findUnique({
      where: {
        userId: userId,
      },
      include: {
        lessons: true,
      },
    });
    if (!library2) {
      throw new Error('library or user doesnt exist');
    }
    const hasLesson = library2.lessons.some((noteBook) => noteBook.id === lessonId);
    if (!hasLesson) {
      throw new Error('user doesnt have this lesson');
    }

    await prisma.noteBook.create({
      data: {
        libraryId: library2.id,
        lessonId,
      },
    });
    //----------------------------------------------------------------

    res.status(201).send(updatedLibrary);
  } catch (error) {
    console.log(error);
    res.status(400).send(`${error}`);
  }
};

const getLessons = async (req: Request, res: Response) => {
  try {
    const library = await prisma.library.findUnique({
      where: {
        userId: req.params.userId,
      },
      include: {
        lessons: true,
      },
    });

    res.status(200).send(library?.lessons);
  } catch (error) {
    console.error(error);
    res.status(500).send('Library doesnt find');
  }
};

const getLesson = async (req: Request, res: Response) => {
  try {
    const lessonInLibrary = await prisma.library.findUnique({
      where: {
        userId: req.params.userId,
      },
      include: {
        lessons: {
          where: {
            id: req.params.lessonId,
          },
        },
      },
    });
    res.status(200).send(lessonInLibrary);
  } catch (error) {
    console.error(error);
    res.status(404).send('Lesson not found');
  }
};

const deleteLessonFromLibrary = async (req: Request, res: Response) => {
  try {
    const library = await prisma.library.findUnique({
      where: {
        userId: req.params.userId,
      },
      include: {
        lessons: true,
      },
    });

    if (!library) {
      res.status(404).send(`User with ID ${req.params.userId} not found`);
    }
    const updatedLibrary = await prisma.library.update({
      where: {
        userId: req.params.userId,
      },
      data: {
        lessons: {
          disconnect: {
            id: req.params.lessonId,
          },
        },
      },
    });

    await prisma.noteBook.deleteMany({
      where: {
        lessonId: req.params.lessonId,
      },
    });

    res.status(200).send(updatedLibrary);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server problem');
  }
};

export { addLessonId, getLessons, deleteLessonFromLibrary, getLesson };
