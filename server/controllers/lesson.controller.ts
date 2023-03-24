import { Request, Response } from 'express';
import { prisma } from '../database';

const createLesson = async (req: Request, res: Response) => {
  const name = req.body.name.toLowerCase().trim();
  const { subjectId } = req.body;
  console.log(req.body);
  if (name && subjectId) {
    try {
      const newLesson = await prisma.lesson.create({
        data: {
          name,
          subjectId
        },
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
  const lessonId = req.params.lessonId;
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
      id: req.params.lessonId,
    },
  });
  res.status(200).send(lesson);
};

const updateLesson = async (req: Request, res: Response) => {
  console.log(req.body);
  const updatedLesson = await prisma.lesson.updateMany({
    where: {
      id: req.params.lessonId,
    },
    data: {
      video: req.body.video,
      drawing: req.body.drawing
    }
  });
  res.status(201).send(updatedLesson);
};

export { createLesson, deleteLesson, getLesson, updateLesson};