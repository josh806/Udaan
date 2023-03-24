import { Router } from 'express';
import * as userController  from './controllers/user.controller';
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
router.get('/lesson/:lessonId', lessonController.getLesson);
router.delete('/lesson/:lessonId', lessonController.deleteLesson);
router.put('/lesson/:lessonId', lessonController.updateLesson);

//library routes
router.get('/library/:userId', libraryController.getLessons);
router.get('/library/:userId/:lessonId', libraryController.getLesson);
router.delete('/library/:userId/:lessonId', libraryController.deleteLessonFromLibrary);
router.put('/library/:userId/:lessonId', libraryController.addLessonId);

//noteBook routes
router.post('/noteBook', noteBookController.createNote);
router.get('/noteBook/:userId/:lessonId', noteBookController.getOneLessonNote);
router.get('/noteBook/:userId', noteBookController.getAllUserNotes);
router.delete('/noteBook/:userId/:lessonId', noteBookController.deleteNote);
router.put('/noteBook', noteBookController.updateNote);





export default router;
