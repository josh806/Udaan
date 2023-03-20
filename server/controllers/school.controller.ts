import { Request, Response } from 'express';
import { prisma } from '../database';

const createSchool = async (req: Request, res: Response) => {
  console.log('Creating school');
  const { name, email } = req.body;
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
    res.status(300);
  }
};

export { createSchool };