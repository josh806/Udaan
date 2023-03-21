import { Router } from 'express';
import * as userController  from './controllers/user.controller';
import * as schoolController from './controllers/school.controller';
import * as subjectController from './controllers/subject.controller';
import * as lessonController from './controllers/lesson.controller';
const router = Router();

//user routes
router.post('/users', userController.createUser);
router.get('/user/:unique', userController.getUserByIdOrUsername);
router.put('/user/:id', userController.updateUser);

//school routes
router.post('/school', schoolController.createSchool);
router.get('/school/:id', schoolController.getUsers);
router.get('/school/:id/subjects', schoolController.getSubjects);

//subject routes
router.post('/subject', subjectController.createSubject);


//lessons routes
router.post('/lesson', lessonController.createLesson);

export default router;
