import { Router } from 'express';
import * as userController  from './controllers/user.controller';
import * as schoolController from './controllers/school.controller';
const router = Router();

//user routes
router.post('/users', userController.createUser);

//school routes
router.post('/school', schoolController.createSchool);

//subject routes


//lessons routes


export default router;
