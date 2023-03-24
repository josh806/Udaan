"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("./controllers/user.controller"));
const schoolController = __importStar(require("./controllers/school.controller"));
const subjectController = __importStar(require("./controllers/subject.controller"));
const lessonController = __importStar(require("./controllers/lesson.controller"));
const libraryController = __importStar(require("./controllers/library.controller"));
const noteBookController = __importStar(require("./controllers/noteBook.controller"));
const router = (0, express_1.Router)();
//user routes
router.post('/user', userController.createUser);
router.get('/user/:userId/id', userController.getUserById);
router.get('/user/:username/username', userController.getUserByUsername);
router.put('/user', userController.updateUser);
//school routes
router.post('/school', schoolController.createSchool);
router.get('/school/:schoolId', schoolController.getSchool);
//subject routes
router.post('/subject', subjectController.createSubject);
router.get('/subject/:schoolId', subjectController.getSubjects);
router.delete('/subject/:subjectId', subjectController.deleteSubject);
//lessons routes
router.post('/lesson', lessonController.createLesson);
router.get('/lesson/:lessonId', lessonController.getLesson);
router.delete('/lesson/:lessonId', lessonController.deleteLesson);
router.put('/lesson/:lessonId', lessonController.updateLesson);
//library routes - post library automatically created when user is created
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
//whiteboard routes
// router.post('/whiteboard', whiteboardController.createWhiteBoard)
exports.default = router;
