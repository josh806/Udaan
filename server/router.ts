import { Router } from 'express';
import * as userController from './controllers/user.controller';
import * as schoolController from './controllers/school.controller';
import * as subjectController from './controllers/subject.controller';
import * as lessonController from './controllers/lesson.controller';
import * as libraryController from './controllers/library.controller';
import * as noteBookController from './controllers/noteBook.controller';
const router = Router();

//user routes
router.post('/user', userController.createUser);
router.get('/user/id', userController.getUserById);
router.get('/user/:username/username', userController.getUserByUsername);
router.put('/user', userController.updateUser);

//school routes
router.post('/school', schoolController.createSchool);
router.get('/school/:schoolId/users', schoolController.getUsers);
router.get('/school/:schoolId/subjects', schoolController.getSubjects);

//subject routes
router.post('/subject', subjectController.createSubject);
router.delete('/subject/:subjectId', subjectController.deleteSubject);

//lessons routes
router.post('/lesson', lessonController.createLesson);
router.delete('/lesson/:lessonId', lessonController.deleteLesson);
router.get('/lesson/:lessonId', lessonController.getLesson);
router.put('/lesson/:lessonId', lessonController.updateLesson);

//library routes
router.put('/library/:userId/:lessonId', libraryController.addLessonId);
router.get('/library/:userId/library', libraryController.getLessons);
// router.get('/library/:id/notes', libraryController.getNotes);
router.delete(
  '/library/:userId/library/:lessonId',
  libraryController.deleteLessonFromLibrary
);
router.get('/user/:id/library/:lessonId', libraryController.getLesson);

//noteBook routes
router.post('/noteBook', noteBookController.createNote);

export default router;
