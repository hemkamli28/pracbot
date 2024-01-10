const express = require('express');
const Paper = require('../Models/paper');
const { uploadPaper, storage , viewPapers, filterPapers} = require('../Controllers/paper');
const multer = require('multer');
const { authUser } = require('../Middlewares/authUser');
const { authRole } = require('../Middlewares/authRole');
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.single("file"), authUser,  authRole('admin') ,uploadPaper);
router.get("/all", viewPapers);
router.get("/filter", filterPapers);

module.exports = router;