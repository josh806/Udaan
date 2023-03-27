import { Request, Response } from 'express';
import { createRoom, generateRoomToken } from './requestToAgora';
import { prisma } from '../../database';
import * as whiteboardController from './whiteboard.controller';


const createOrGetToken = async (req: Request, res: Response) => {
  try {
    // 0. check if token already exists
    const hasToken = await whiteboardController.getToken(req);
    if (!hasToken) {
      // 1. create a whiteboard room
      const data = await createRoom();
      req.body = data;

      // 2. store whiteboard session in db
      await whiteboardController.createWhiteboard(req);

      // 3. create token
      const token = await generateRoomToken(data.uuid);
      req.body = token;

      // 4. store token in db
      await whiteboardController.addToken(req, res);
    } else { res.send(hasToken); }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
};

const getTokenForStudent = async (req: Request, res: Response) => {
  const lessonId = req.params.lessonId;
  try {
    const whiteBoard = await prisma.whiteboard.findUnique({
      where: { lessonId: lessonId  },
    });
    if (whiteBoard.token) {
      res.send(whiteBoard);
    } else {
      throw new Error;
    }
  } catch (error) {
    console.error(error);
    return res.send({error: 'token or whiteboard doesnt exist'});
  }
};

export { createOrGetToken, getTokenForStudent };
