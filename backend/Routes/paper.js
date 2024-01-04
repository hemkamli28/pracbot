const express = require('express');
const Paper = require('../Models/paper');
const { uploadPaper, storage , viewPapers, filterPapers} = require('../Controllers/paper');
const multer = require('multer')
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.single("file"), uploadPaper);
router.get("/all", viewPapers);
router.get("/filter", filterPapers);

module.exports = router;