import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       firstName: 'Victor',
  //       lastName: 'Losada',
  //       email: 'victor@losada.com.br',
  //       username: 'Vlosada',
  //       student: true,
  //       schoolId: 1
  //     },
  //     {
  //       firstName: 'Valentin',
  //       lastName: 'Gaugain',
  //       email: 'val@gaugain.com.fr',
  //       username: 'Vgaugain',
  //       student: true,
  //       schoolId: 1
  //     },
  //     {
  //       firstName: 'Josh',
  //       lastName: 'McCarthy',
  //       email: 'josh@mccarthy.com.nz',
  //       username: 'JMcCarthy',
  //       student: true,
  //       schoolId: 1
  //     },
  //     {
  //       firstName: 'Joshua',
  //       lastName: 'Thomas',
  //       email: 'joshua@thomas.com.hd',
  //       username: 'Jthomas',
  //       student: true,
  //       schoolId: 1
  //     },
  //     {
  //       firstName: 'Joaquin',
  //       lastName: 'Buxó',
  //       email: 'joaquin@buxo.com.es',
  //       username: 'Jbuxó',
  //       student: true,
  //       schoolId: 1
  //     },
  //     {
  //       firstName: 'Yacine',
  //       lastName: 'Kadri',
  //       email: 'yacine@kadri.com.fr',
  //       username: 'Ykadri',
  //       student: true,
  //       schoolId: 1
  //     },
  //   ]
  // })

  // await prisma.subject.createMany({
  //   data: [
  //     {
  //       name: 'Javascript',
  //       schoolId: 1
  //     },
  //     {
  //       name: 'Typescript',
  //       schoolId: 1
  //     },
  //   ]
  // })

  await prisma.lesson.createMany({
    data: [
      {
        name: 'Introduction',
        subjectId: 1
      },
      {
        name: 'Basics',
        subjectId: 1
      },
      {
        name: 'Advanced',
        subjectId: 1
      },
      {
        name: 'Project',
        subjectId: 1
      },
      {
        name: 'Introduction',
        subjectId: 2
      },
      {
        name: 'Basics',
        subjectId: 2
      },
      {
        name: 'Advanced',
        subjectId: 2
      },
      {
        name: 'Project',
        subjectId: 2
      },
    ]
  })

  const allSchools = await prisma.school.findMany({
    include: {
      users: true,
      subjects: true
    },
  })
  console.dir(allSchools, {depth:null})
}

main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})