import { Request, Response } from 'express';
import { prisma } from '../database';


const createUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, username, student, schoolId } = req.body;
  if (firstName && lastName && email && username && student !== undefined && schoolId) {
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
        }
      });
      const library = {
        userId: newUser?.id
      };
      await prisma.library.create({ data : library });
      res.status(201);
      res.send(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error });
    }
  } else {
    res.status(400).send('Parameter missing to create a new user');
  }
};


const getUserByIdOrUsername = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: req.params.unique }, 
          { username: req.params.unique }, 
        ]
      }
    });
    if (!user) { throw new Error(); }
    console.log(req.params);
    if (Object.keys(req.params)[0] == 'id') {
      res.send(user);
    } else if (Object.keys(req.params)[0] == 'username') {
      res.send('username exists');
    }
    res.send('ok');
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'User not found' });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const key = Object.keys(req.body)[0];
    if (key !== 'email' && key !== 'student' && key !== 'schoolId' ) {
      const user = await prisma.user.update({
        where: { id: String(id) },
        data: req.body
      });
      res.status(200);
      res.send(user);
    } else {
      res.status(401).send({ error: 'Cannot update this property' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Could not update the user' });
  }
};


export { createUser, getUserByIdOrUsername, updateUser };