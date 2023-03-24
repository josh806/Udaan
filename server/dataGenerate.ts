import { prisma } from './database';

async function generateDatabase () {
  const newSchool = await prisma.school.create({
    data: {
      name: 'Code',
      email: 'code@code.com',
    },
  });

  const newUser1 = await prisma.user.create({
    data: {
      id: 'abcd1',
      firstName: 'Victor',
      lastName: 'Losada',
      email: 'victor@losada.com.br',
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
      id: 'abcd2',
      firstName: 'Joaquin',
      lastName: 'Buxó',
      email: 'joaquin@buxó.com.es',
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
      id: 'abcd3',
      firstName: 'Valentin',
      lastName: 'Gaulg',
      email: 'val@gaulg.com.fr',
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
      id: 'abcd4',
      firstName: 'Josh',
      lastName: 'McCarthy',
      email: 'josh@mccarthy.com.nz',
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
      id: 'abcd5',
      firstName: 'Joshua',
      lastName: 'Thomas',
      email: 'josh@thomas.com',
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
      id: 'abcd6',
      firstName: 'Yacine',
      lastName: 'Kadri',
      email: 'yacine@kadri.com.fr',
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
      id: 'abcd7',
      firstName: 'Guillem',
      lastName: 'Sardà',
      email: 'guillem@codeworks.com',
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
        subjectId: newSubject.id,
      },
      {
        name: 'Class 2',
        subjectId: newSubject.id,
      },
      {
        name: 'Class 3',
        subjectId: newSubject.id,
      },
    ],
  });
}

generateDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
