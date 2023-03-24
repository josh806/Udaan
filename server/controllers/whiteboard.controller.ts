import { Request, Response } from 'express';
import { prisma } from '../database';


const createWhiteboard = async (req: Request, res: Response) => {
  const lessonId = req.params.lessonId;
  const { uuid, teamUUID, appUUID, isBan, createdAt, limit } = req.body;
  try {
    const newWhiteBoard = await prisma.whiteboard.create({
      data: {
        uuid,
        teamUUID,
        appUUID,
        isBan,
        createdAt,
        limit,
        lessonId
      }
    });
    res.status(201);
    res.send(newWhiteBoard);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
};

const addToken = async (req: Request, res: Response) => {
  const lessonId = req.params.lessonId;
  const { token } = req.body;
  try {
    const whiteboardId = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      select: {
        whiteboard: {
          select: {
            uuid:true
          }
        }
      }
    });

    const uuid = whiteboardId?.whiteboard?.uuid;

    const newWhiteBoard = await prisma.whiteboard.update({
      where: { uuid: uuid  },
      data: {
        token,
      }
    });
    res.status(200);
    res.send(newWhiteBoard);

  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Could not update the user' });
  }
};

// const getToken = async (req: Request, res: Response) => {
//   const lessonId = req.params.lessonId;
//   try {
//     const whiteboardId = await prisma.lesson.findUnique({
//       where: {
//         id: lessonId,
//       },
//       select: {
//         whiteboard: {
//           select: {
//             uuid:true
//           }
//         }
//       }
//     });
    
//     const uuid = whiteboardId?.whiteboard?.uuid;

//     const newWhiteBoard = await prisma.whiteboard.findUnique({
//       where: { uuid: uuid  },
//       data: {
//         token,
//       }
//     });
//     res.status(200);
//     res.send(newWhiteBoard);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send({ error: 'User not found' });
//   }
// };

export { createWhiteboard, addToken };