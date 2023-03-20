import { Request, Response } from 'express';
import { prisma } from '../database';

const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, username, student, schoolId } = req.body;
  if (firstName && lastName && email && username && student && schoolId) {
    try {
      const newUser = await prisma.user.create({
        data: {
          firstName, 
          lastName,
          email,
          username,
          student, 
          schoolId
        }
      });
      res.status(201);
      res.send(newUser);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send('Server problem');
    }
  } else {
    res.status(404);
    res.send('Parameter missing to create a new user');
  }
};

export { createUser };