import { Request, Response } from 'express';
import { prisma } from '../database';

const createSubject = async (req: Request, res: Response) => {
  const name = req.body.name.toLowerCase().trim();
  const schoolId = req.body.schoolId;
  if (name && schoolId) {
    try {
      const newSubject = await prisma.subject.create({
        data: {
          name,
          schoolId,
        },
      });
      res.status(201);
      res.send(newSubject);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server problem' });
    }
  } else {
    res.status(400).send('Parameter missing to create a new subject');
  }
};

const getSubjects = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const subjects = await prisma.subject.findMany({
      where: {
        schoolId: id,
      },
    });
    res.status(200);
    res.send(subjects);
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: 'Cant find school ID' });
  }
};

const deleteSubject = async (req: Request, res: Response) => {
  const subjectId = req.params.subjectId;
  console.log(req.params.id);
  try {
    await prisma.lesson.deleteMany({
      where: {
        subjectId: subjectId,
      },
    });
    const deletedSubject = await prisma.subject.delete({
      where: {
        id: subjectId,
      },
    });
    res.status(200).send(deletedSubject);
  } catch (error) {
    console.error(error);
    res.status(404).send('Subject not found');
  }
};

export { createSubject, getSubjects, deleteSubject };
