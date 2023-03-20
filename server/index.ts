require('dotenv').config();
import express, { Application } from 'express';
import cors from 'cors';
import router from './routes/router';

const PORT = process.env.PORT || 3001;

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(router); 

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);