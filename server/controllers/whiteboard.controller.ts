import { Request, Response } from 'express';
import { prisma } from '../database';


const createWhiteboard = async (req: Request, res: Response) => {
  try {
    const newWhiteBoard = await prisma.whiteboard.create({
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
    res.status(201);
    res.send(newWhiteBoard);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
};


// const getUserById = async (req: Request, res: Response) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: req.params.userId
//       }, 
//     });
//     if (!user) { throw new Error(); }
//     res.send(user);
//     res.status(200);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send({ error: 'User not found' });
//   }
// };

// const getUserByUsername = async (req: Request, res: Response) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         username: req.params.username
//       }, 
//     });
//     if (!user) { throw new Error(); }
//     res.send({username: req.params.username});
//     res.status(200);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send({ error: 'User not found' });
//   }
// };

// const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { id, firstName, lastName, student, avatar } = req.body;
//     const user = await prisma.user.update({
//       where: { id: String(id) },
//       data: {
//         firstName,
//         lastName,
//         student,
//         avatar
//       }
//     });
//     res.status(200);
//     res.send(user);

//   } catch (error) {
//     console.error(error);
//     res.status(400).send({ error: 'Could not update the user' });
//   }
// };

export { createWhiteboard };