const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    sem: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    filename: {
        type: String
    },
    path: {
        type: String
    }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;