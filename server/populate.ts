import { Request, Response } from 'express';
import { prisma } from './database';

async function generateDatabase() {
  const newSchool = await prisma.school.create({
    data: {
      id: '1',
      name: 'Code',
      email: 'code@code.com',
    },
  });

  const newUser1 = await prisma.user.create({
    data: {
      id: 'auth0|641f0fdde1118da83ff1343b',
      firstName: 'Victor',
      lastName: 'Losada',
      email: 'vlosada77@gmail.com',
      username: 'Vlosada',
      student: true,
      schoolId: newSchool.id,
    },
  });
  const library1 = {
    userId: newUser1?.id,
  };
  await prisma.library.create({ data: library1 });
  const newUser2 = await prisma.user.create({
    data: {
      id: 'auth0|641f113068011b5232bd21c5',
      firstName: 'Joaquin',
      lastName: 'Buxó',
      email: 'jamesbond1@gmail.com',
      username: 'Jbuxó',
      student: true,
      schoolId: newSchool.id,
    },
  });
  const library2 = {
    userId: newUser2?.id,
  };
  await prisma.library.create({ data: library2 });
  const newUser3 = await prisma.user.create({
    data: {
      id: 'auth0|641d9849f939365a568f0200',
      firstName: 'Valentin',
      lastName: 'Gaulg',
      email: 'val@hotmail.fr',
      username: 'Vgaulg',
      student: true,
      schoolId: newSchool.id,
    },
  });
  const library3 = {
    userId: newUser3?.id,
  };
  await prisma.library.create({ data: library3 });
  const newUser4 = await prisma.user.create({
    data: {
      id: 'auth0|641b5eb119607078dd5ad62c',
      firstName: 'Josh',
      lastName: 'McCarthy',
      email: 'joaquintest@123.com',
      username: 'JmcCarthy',
      student: true,
      schoolId: newSchool.id,
    },
  });
  const library4 = {
    userId: newUser4?.id,
  };
  await prisma.library.create({ data: library4 });
  const newUser5 = await prisma.user.create({
    data: {
      id: 'auth0|641f1768f939365a568f1e3f',
      firstName: 'Joshua',
      lastName: 'Thomas',
      email: 'joshtest5@test.com',
      username: 'Jthomas',
      student: true,
      schoolId: newSchool.id,
    },
  });
  const library5 = {
    userId: newUser5?.id,
  };
  await prisma.library.create({ data: library5 });
  const newUser6 = await prisma.user.create({
    data: {
      id: 'auth0|64188241739976b7470d8e04',
      firstName: 'Yacine',
      lastName: 'Kadri',
      email: 'hellotest@hello.com',
      username: 'Ykadri',
      student: true,
      schoolId: newSchool.id,
    },
  });
  const library6 = {
    userId: newUser6?.id,
  };
  await prisma.library.create({ data: library6 });
  await prisma.user.create({
    data: {
      id: 'auth0|641f0e0368011b5232bd21a4',
      firstName: 'Guillem',
      lastName: 'Sardà',
      email: 'josh@thomas.com',
      username: 'Gsardà',
      student: false,
      schoolId: newSchool.id,
    },
  });

  const newSubject = await prisma.subject.create({
    data: {
      name: 'Javascript',
      schoolId: newSchool.id,
    },
  });
  await prisma.lesson.createMany({
    data: [
      {
        name: 'Class 1',
        scheduledDate: '21/04/2023',
        subjectId: newSubject.id,
      },
      {
        name: 'Class 2',
        scheduledDate: '22/04/2023',
        subjectId: newSubject.id,
      },
      {
        name: 'Class 3',
        scheduledDate: '23/04/2023',
        subjectId: newSubject.id,
      },
    ],
  });
}

export { generateDatabase };
