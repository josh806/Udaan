import { Request, Response } from 'express';
import { prisma } from '../database';

const createLesson = async (req: Request, res: Response) => {
  const name = req.body.name.toLowerCase().trim();
  const { recording, subjectId } = req.body;
  console.log(req.body);
  if (name && subjectId && recording !== undefined) {
    try {
      const newLesson = await prisma.lesson.create({
        data: {
          name,
          date: new Date(),
          subjectId
        }
      });
      res.status(201);
      res.send(newLesson);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error });
    }
  } else {
    res.status(400).send('Parameter missing to create a new lesson');
  }
};

const deleteLesson = async (req: Request, res: Response) => {
  const lessonId = req.params.id;
  try {
    const lesson = await prisma.lesson.delete({
      where: {
        id: lessonId,
      },
    });
    res.status(200).send(lesson);
  } catch (error) {
    console.error(error);
    res.status(404).send('Lesson not found');
  }
};

const getLesson = async (req: Request, res: Response) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(lesson);
};

export { createLesson, deleteLesson, getLesson};