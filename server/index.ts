import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './router';
import { prisma } from './controllers/user.controller';



const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use(router); 

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);