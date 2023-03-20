import { Request, Response } from 'express';
import { prisma } from '../database';

const createUser = async (req: Request, res: Response) => {
  console.log('Creating user');
  const { firstName, lastName, email, username, student, schoolId } = req.body;
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
    res.status(300);
  }
};

export { createUser };