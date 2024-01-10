const express = require('express');
const { uploadExam, storage, getStudentExams, getInstructorExam} = require('../Controllers/exam');
const {authUser} = require('../Middlewares/authUser');
const {authRole} = require('../Middlewares/authRole');
const multer = require('multer');
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.single("file"), authUser , authRole('instructor'), uploadExam);
router.get("/getforstudents", authUser, authRole('student'), getStudentExams);
router.get("/getforinstructors", authUser, authRole('instructor'), getInstructorExam);

module.exports = router;