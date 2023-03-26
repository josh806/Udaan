import { Request, Response } from 'express';
import { prisma } from '../../database';

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
  console.log(`this is the ${token}`);
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
    if (!whiteboardId) { throw new Error('no whiteboard found for this lesson'); }
    const uuid = whiteboardId?.whiteboard?.uuid;

    const newWhiteBoard = await prisma.whiteboard.update({
      where: { uuid: uuid  },
      data: {
        token,
      }
    });
    if (!newWhiteBoard) { throw new Error ('problem db server'); }

    res.status(200);
    res.send(newWhiteBoard);

  } catch (error) {
    console.error(error);
    res.status(400).send(`${ error }`);
  }
};

const getToken = async (req: Request, res: Response) => {
  const lessonId = req.params.lessonId;
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
    if (!whiteboardId) { throw new Error('no whiteboard found for this lesson'); }
    const uuid = whiteboardId?.whiteboard?.uuid;

    const whiteBoard = await prisma.whiteboard.findUnique({
      where: { uuid: uuid  },
    });
    if (!whiteBoard) { throw new Error ('problem db server'); }

    res.status(200);
    res.send(whiteBoard);
  } catch (error) {
    console.error(error);
    res.status(400).send(`${ error }`);
  }
};

export { createWhiteboard, addToken, getToken };