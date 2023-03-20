import { Router } from 'express';
import * as userController  from './controllers/user.controller';

const router = Router();

//user routes
router.get('/users', userController.createUser);


export default router;
