import { Router } from 'express';
import * as userController  from './controllers/user.controller';
import * as schoolController from './controllers/school.controller';
import * as subjectController from './controllers/subject.controller';
import * as lessonController from './controllers/lesson.controller';
import * as libraryController from './controllers/library.controller';
const router = Router();

//user routes
router.post('/user/:id', userController.createUser);
router.get('/user/:id/id', userController.getUserById);
router.get('/user/:username/username', userController.getUserByUsername);
router.put('/user/:id', userController.updateUser);

//school routes
router.post('/school', schoolController.createSchool);
router.get('/school/:id/users', schoolController.getUsers);
router.get('/school/:id/subjects', schoolController.getSubjects);

//subject routes
router.post('/subject', subjectController.createSubject);
router.delete('/subject/:id', subjectController.deleteSubject);

//lessons routes
router.post('/lesson', lessonController.createLesson);
router.delete('/lesson/:id', lessonController.deleteLesson);
router.get('/lesson/:id', lessonController.getLesson);
router.put('/lesson/:id', lessonController.updateLesson);

//library routes
router.put('/user/:id/:lessonId', libraryController.addLessonId);
router.get('/user/:id/library', libraryController.getLessons);
// router.get('/user/:id/notes', libraryController.getNotes);
router.delete('/user/:id/library/:lessonId', libraryController.deleteLessonFromLibrary);
router.get('/user/:id/library/:lessonId', libraryController.getLesson);


export default router;
