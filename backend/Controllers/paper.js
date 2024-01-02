const multer = require('multer');
const Paper = require('../Models/paper');


const uploadPaper = async (req, res) => {
    try {
        console.log(req);
        const { filename, path } = req.file;
        const { year, branch, subject } = req.body;
        const paper = new Paper({ filename, path, year, branch, subject });
        await paper.save();
        res.status(201).json({paper , success: true,message : 'File uploaded successfully!'});
    } catch (error) {
        res.status(500).json({success: false, message : 'Internal Server Error!', error: error});
        console.error(error);
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


module.exports = { uploadPaper, storage }
