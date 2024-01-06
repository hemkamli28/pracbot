const express = require('express');
const { uploadExam, storage } = require('../Controllers/exam');
const multer = require('multer')
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.single("file"), uploadExam);

module.exports = router;