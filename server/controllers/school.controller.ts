import { Request, Response } from 'express';
import { prisma } from '../database';

const createSchool = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (name && email) {
    try {
      const newSchool = await prisma.school.create({
        data: {
          name, 
          email
        }
      });
      res.status(201);
      res.send(newSchool);
    } catch (error) {
      console.log(error);
      res.send('Server problem');
      res.status(500).send({ error: 'User not found' });
    }
  } else {
    res.status(404);
    res.send('Parameter missing to create a new school');
  }
};

const getUsers = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const users = await prisma.school.findMany({
      where: {
        id: Number(id),
      },
      include: {
        users: true
      } 
    });
    res.status(200);
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: 'Cant find school ID' });
  }
};

const getSubjects = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const subjects = await prisma.school.findMany({
      where: {
        id: Number(id),
      },
      include: {
        subjects: true
      } 
    });
    res.status(200);
    res.send(subjects);
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: 'Cant find school ID' });
  }
};

export { createSchool, getUsers, getSubjects };