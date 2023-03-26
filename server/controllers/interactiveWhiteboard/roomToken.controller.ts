import { Request, Response } from 'express';
// import { prisma } from '../../database';
import { createRoom, generateRoomToken } from './requestToAgora';
import * as whiteboardController from './whiteboard.controller';


const createToken = async (req: Request, res: Response) => {
//   const { lessonId } = req.params;
  try {
  // 1. create a whiteboard room
    const data = await createRoom();
    // const { uuid, teamUUID, appUUID, isBan, createdAt, limit } = data;
    req.body = data;
    
    // 2. store whiteboard session in db
    whiteboardController.createWhiteboard(req, res);

    // 3. create token
    const token = await generateRoomToken(data.uuid);
    req.body = token;
    
    // 4. store token in db
    whiteboardController.addToken(req, res);

    // res.status(201);
    // res.send(newWhiteBoard);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }

};



// const getToken = async (req: Request, res: Response) => {
//   const { lessonId } = req.params;    

// }



export { createToken };
