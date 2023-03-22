import { Request, Response } from 'express';
import { prisma } from '../database';

const createSubject = async (req: Request, res: Response) => {
  const { name, schoolId } = req.body;
  if (name && schoolId) {
    try {
      const newSubject = await prisma.subject.create({
        data: {
          name, 
          schoolId
        }
      });
      res.status(201);
      res.send(newSubject);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error });
    }
  } else {
    res.status(400).send('Parameter missing to create a new subject');
  }
};

export { createSubject };