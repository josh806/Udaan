import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./user.controller";


const options = {
  method: "POST",
  url: "https://api.netless.link/v5/rooms",
  headers: {
    token:
      "NETLESSSDK_YWs9Y2d4Y1NTVG1rN25neGpkSSZub25jZT1mYzY1NGIwMC1jNzE5LTExZWQtYWM2OS1mOTc2YTcxOTk1OWUmcm9sZT0wJnNpZz1hMTU0ZWRkZTM3ODAwYjBlNjY5Mzk4NjBiZGQxZDY0ZDMyMzIyMDkzMjFhOGI3ZTNlODkzNGJjYmYzNzRmYTli",
    "Content-Type": "application/json",
    region: "us-sv",
  },
  body: JSON.stringify({
    isRecord: false,
  }),
};



const createWhiteboard = async (req: Request, res: Response) => {
  try {
    const room = req.body;
    const id = room.uuid;
    console.log(room)
    const name = "Name" + id;
    const newWhiteboard = await prisma.whiteboard.create({
      data: {
        id: id,
        name: name,
      },
    });
    res.status(200);
    res.send(newWhiteboard);
  } catch (error) {
    console.log(error);
    res.status(300);
  }
};

const joinWhiteboard = async (req: Request, res: Response) => {
  try {
    const  id = 'f7ef7cb0c74d11ed85245975e226531a';
    const whiteboard = await prisma.whiteboard.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200);
    res.send(whiteboard);
  } catch (error) {
    console.log(error);
    res.status(300);
  }
};


export = {createWhiteboard, joinWhiteboard};
