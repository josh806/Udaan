import { Request, Response } from 'express';
import { prisma } from '../database';

const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, username, student, schoolId } = req.body;
  console.log(req.body);
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
      console.error(error);
      res.status(500).send({ error: 'Server problem' });
    }
  } else {
    res.status(400).send('Parameter missing to create a new user');
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany({
      where: { 
        id : req.params, 
      },
      select: {
        firstName: true, 
        lastName: true, 
        email: true, 
        username: true, 
        avatar: true, 
        student: true, 
        school: true
      }
    });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: 'User not found' });
  }
};



const userUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    const user = await prisma.user.update({
      where: {id: String(id)},
      data: req.body
    });
    // const user = await prisma.school.update({
    //   where: {
    //     id: Number(schoolId)
    //   },
    //   include: {
    //     users: {
    //       where: {
    //         id: Number(id)
    //       },
    //       take: req.body
    //     }
    //   }
    // });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: 'User not found' });
  }
};

export { createUser, getUserById, userUpdate };