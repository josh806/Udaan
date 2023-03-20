import { Router } from 'express';
import * as userController  from './controllers/user.controller';
import {createWhiteboard, joinWhiteboard} from './controllers/whiteboard.controller';

const router = Router();

//user routes
router.get('/users', userController.createUser);
router.post('/room/create', createWhiteboard);
router.post('/room/join/f7ef7cb0c74d11ed85245975e226531a', joinWhiteboard);

export default router;
