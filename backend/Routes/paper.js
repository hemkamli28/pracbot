const express = require('express');
const Paper = require('../Models/paper');
const { uploadPaper, storage } = require('../Controllers/paper');
const multer = require('multer')

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.single("file"), uploadPaper);

module.exports = router;