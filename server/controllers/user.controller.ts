import { Request, Response } from 'express';
import { prisma } from '../database';

const createUser = async (req: Request, res: Response) => {
  const { id, firstName, lastName, email, student, schoolId } = req.body;
  const username = req.body.username.toLowerCase().trim();
  if (
    firstName &&
    lastName &&
    email &&
    username &&
    student !== undefined &&
    schoolId
  ) {
    try {
      const newUser = await prisma.user.create({
        data: {
          id,
          firstName,
          lastName,
          email,
          username,
          student,
          schoolId,
        },
      });
      const library = {
        userId: newUser?.id,
      };
      await prisma.library.create({ data: library });
      res.status(201);
      res.send(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error });
    }
  } else {
    console.log('parameter missing');
    res.status(400).send({ error: 'Submitting form wrong' });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.userId,
      },
    });
    if (!user) {
      throw new Error();
    }
    res.send(user);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'User not found' });
  }
};

const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.params.username,
      },
    });
    if (!user) {
      throw new Error();
    }
    res.send({ username: req.params.username });
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'User not found' });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id, firstName, lastName, username, avatar } = req.body;
    const user = await prisma.user.update({
      where: { id: String(id) },
      data: {
        firstName,
        lastName,
        username,
        avatar,
      },
    });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Could not update the user' });
  }
};

const getLessonsByUser = async (req: Request, res: Response) => {
  try {
    const library = await prisma.user.findUnique({
      where: {
        id: req.params.userId,
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

export {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  getLessonsByUser,
};
