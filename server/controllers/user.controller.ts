import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
  try {
    const createUser = await prisma.user.create({
      data: req.body,
    });
    res.status(200);
    res.send(createUser);
  } catch (error) {
    console.log(error);
    res.status(300);
  }
};




export { createUser };