import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

//Mock data:
// async function main() {
//   // await prisma.user.createMany({
//   //   data: [
//   //     {
//   //       firstName: 'Victor',
//   //       lastName: 'Losada',
//   //       email: 'victor@losada.com.br',
//   //       username: 'Vlosada',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //     {
//   //       firstName: 'Valentin',
//   //       lastName: 'Gaugain',
//   //       email: 'val@gaugain.com.fr',
//   //       username: 'Vgaugain',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //     {
//   //       firstName: 'Josh',
//   //       lastName: 'McCarthy',
//   //       email: 'josh@mccarthy.com.nz',
//   //       username: 'JMcCarthy',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //     {
//   //       firstName: 'Joshua',
//   //       lastName: 'Thomas',
//   //       email: 'joshua@thomas.com.hd',
//   //       username: 'Jthomas',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //     {
//   //       firstName: 'Joaquin',
//   //       lastName: 'Buxó',
//   //       email: 'joaquin@buxo.com.es',
//   //       username: 'Jbuxó',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //     {
//   //       firstName: 'Yacine',
//   //       lastName: 'Kadri',
//   //       email: 'yacine@kadri.com.fr',
//   //       username: 'Ykadri',
//   //       student: true,
//   //       schoolId: 1
//   //     },
//   //   ]
//   // })

//   // await prisma.subject.createMany({
//   //   data: [
//   //     {
//   //       name: 'Javascript',
//   //       schoolId: 1
//   //     },
//   //     {
//   //       name: 'Typescript',
//   //       schoolId: 1
//   //     },
//   //   ]
//   // })

//   // await prisma.lesson.createMany({
//   //   data: [
//   //     {
//   //       name: 'Introduction',
//   //       subjectId: 1
//   //     },
//   //     {
//   //       name: 'Basics',
//   //       subjectId: 1
//   //     },
//   //     {
//   //       name: 'Advanced',
//   //       subjectId: 1
//   //     },
//   //     {
//   //       name: 'Project',
//   //       subjectId: 1
//   //     },
//   //     {
//   //       name: 'Introduction',
//   //       subjectId: 2
//   //     },
//   //     {
//   //       name: 'Basics',
//   //       subjectId: 2
//   //     },
//   //     {
//   //       name: 'Advanced',
//   //       subjectId: 2
//   //     },
//   //     {
//   //       name: 'Project',
//   //       subjectId: 2
//   //     },
//   //   ]
//   // })

//   // const allSchools = await prisma.school.findMany({
//   //   include: {
//   //     users: true,
//   //     subjects: true
//   //   },
//   // })
//   // console.dir(allSchools, {depth:null})
// }

// main()
// .then(async () => {
//   await prisma.$disconnect()
// })
// .catch(async (e) => {
//   console.error(e)
//   await prisma.$disconnect()
//   process.exit(1)
// })

//School controller:
const createSchool = async (req: Request, res: Response) => {
  try {
    const newSchool = await prisma.school.create({
      data: req.body,
    });
    res.status(201);
    res.send(newSchool);
  } catch (error) {
    console.error(error);
  }
};

//User controller: 
const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await prisma.user.create({
      data: req.body,
    });
    res.status(201);
    res.send(newUser);
  } catch (error) {
    console.error(error);
  }
};

const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const userToUpdate = await prisma.user.update({
      where: { id: req.body.id },
      data: {
        avatar: req.body.avatar
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userToDelete = await prisma.user.delete({
      where: { id: req.body.id}
    });
  } catch (error) {
    console.error(error);
  }
};

//Subject controller
const createSubject = async (req: Request, res: Response) => {
  try {
    const newSubject = await prisma.subject.create({
      data: req.body
    });
    res.status(201);
    res.send(newSubject);
  } catch (error) {
    console.error(error);
  }
};


//Lessons controllers
const createLesson = async (req: Request, res: Response) => {
  try {
    const newLesson = await prisma.lesson.create({
      data: req.body
    });
    res.status(201);
    res.send(newLesson);
  } catch (error) {
    console.error(error);
  }
};