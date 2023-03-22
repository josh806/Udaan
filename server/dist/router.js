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
const router = (0, express_1.Router)();
//user routes
router.post('/user/:id', userController.createUser);
router.get('/userId/:id', userController.getUserById);
router.get('/userUsername/:username', userController.getUserByUsername);
router.put('/user/:id', userController.updateUser);
//school routes
router.post('/school', schoolController.createSchool);
router.get('/school/:id', schoolController.getUsers);
router.get('/school/:id/subjects', schoolController.getSubjects);
//subject routes
router.post('/subject', subjectController.createSubject);
//lessons routes
router.post('/lesson', lessonController.createLesson);
//library routes
router.put('/library/:libraryId/:lessonId', libraryController.addLessonId);
exports.default = router;
