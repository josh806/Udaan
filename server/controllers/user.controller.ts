import { Request, Response } from 'express';
import { prisma } from '../database';


const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, username, student, schoolId } = req.body;
  if (firstName && lastName && email && username && student !== undefined && schoolId) {
    try {
      const newUser = await prisma.user.create({
        data: {
          firstName, 
          lastName,
          email,
          username,
          student, 
          schoolId,
        }
      });

      // const newLibrary = await prisma.library.create({
      //   data: {
      //     userId: newUser.id
      //   }
      // });

      // await prisma.$transaction(
      //   newUser.lessons.map((lesson) => {
      //     return prisma.lesson.update({
      //       where: {
      //         id: lesson.id
      //       },
      //       data: {
      //         library: {
      //           connect: {
      //             id: newLibrary.id
      //           }
      //         }
      //       }
      //     });
      //   })
      // );

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
    res.send(user);
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

const addLessonId = async (req: Request, res: Response) => {
  console.log(req.params);
  try {
    const user = await prisma.user.update({
    // const user = await prisma.user.findUnique({

      where: {
        id: req.params.id,
      },
      data: {
        lessons: {
          push: 1223,
        },
      },
      // select: {
      //   lessons: true,
      // }
    });
    if (!user) { throw new Error(); }
    // if (user) {
    console.log(user);
    //   // user.lesson.push(req.params.lessonId);
    //   const updatedUser = await prisma.user.update({
    //     data: {
    //       lessons: {
    //         set : [...user.lessons, req.params]
    //       }
    //     },
    //     where: {
    //       id: req.params.id,
    //     },
    //   });
    //   // console.log(updatedUser);
    //   res.send(updatedUser);
    // }
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error });
  }
};
// router.put('/user/:id/:lessonId', userController.addLessonId);


export { createUser, getUserByIdOrUsername, updateUser, addLessonId };