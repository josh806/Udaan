import { Router } from 'express';
import * as userController  from './controllers/user.controller';
import * as schoolController from './controllers/school.controller';
const router = Router();

//user routes
router.post('/users', userController.createUser);
router.get('/users', userController.getUser);
router.put('/users/:id', userController.userUpdate);

//school routes
router.post('/school', schoolController.createSchool);
router.get('/school/:id', schoolController.getUsers);
router.get('/school/:id/subjects', schoolController.getSubjects);

//subject routes


//lessons routes


export default router;
