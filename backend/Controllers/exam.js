const Exam = require("../Models/exam");
const multer = require('multer');

const uploadExam = async (req, res) => {
    try {
        const { filename, path } = req.file;
        const { name, sem,branch, subject } = req.body;
        const exam = new Exam({ filename, path, name ,sem, branch, subject });
        await exam.save();
        res.status(201).json({ exam, success: true, message: 'Exam uploaded successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error!', error: error });
        console.error(error);
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/exams');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

module.exports = {uploadExam, storage};