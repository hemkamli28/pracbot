const Exam = require("../Models/exam");
const moment = require('moment');
const multer = require('multer');
const User = require('../Models/user');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
        user: 'pracbot2024@gmail.com',
        pass: 'iizi crxq ymch phzs',
    },
});

const sendMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'pracbot2024@gmail.com',
            to,
            subject,
            text,
        });
        console.log('Email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const uploadExam = async (req, res) => {
    try {
        const { filename, path } = req.file;
        const { name, branch, sem, subject, startTime, endTime, date } = req.body;

        const st = moment(startTime, 'HH:mm', true).toDate();
        const et = moment(endTime, 'HH:mm', true).toDate();

        const user = await User.findOne({ email: req.user.email });
        const instructorId = user._id;
        const newExam = new Exam({
            name,
            branch,
            sem,
            subject,
            scheduledBy: instructorId,
            startTime: st,
            endTime: et,
            filename,
            path,
            date
        });
        await newExam.save();

        const students = await User.find({ sem, branch });
        const emailSubject = 'Exam Notification';

        const emailPromises = students.map(async (student) => {
            let emailText = `Dear ${student.fname}, ${name} of ${subject} has been Scheduled on ${date} at ${startTime} am. Good luck!`;
            await sendMail(student.email, emailSubject, emailText);
        });

        await Promise.all(emailPromises);



        console.log(newExam);
        res.status(201).json({ newExam, success: true, message: 'Exam uploaded successfully!' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: 'Internal Server Error' });
    }
}

// const getStudentOngoing = async (req, res) => {
//     try {
//         const student = await User.findOne({ email: req.user.email });
//         const exams = await Exam.find({ sem: student.sem, branch: student.branch }).populate("scheduledBy", "fname lname");
        
//         const currentTime = new Date();
//         for (const exam of exams) {
//             const startTime = new Date(exam.startTime); // Convert string to Date object
//             const endTime = new Date(exam.endTime);     // Convert string to Date object
//             console.log('Current Time:', currentTime.toISOString());
//             console.log('Start Time:', startTime.toISOString());
//             console.log('End Time:', endTime.toISOString());
//             const currentTimeUTC = new Date().toISOString();
// console.log("------------------------------------------------------")
//             console.log('currentTimeUTC:', currentTimeUTC);
// console.log('startTime:', startTime.toISOString());
// console.log('endTime:', endTime.toISOString());
// console.log('Comparison result:', currentTimeUTC >= startTime, currentTimeUTC <= endTime);
//             console.log("currentTimeUTC", currentTimeUTC)
//             if (currentTime >= startTime && currentTime <= endTime) {
//                 console.log('Exam found:', exam);
//                 return res.status(200).json({ exam, success: true });
//             } else {
//                 console.log('Exam not ongoing:', exam);
//             }
//         }
//         console.log('No ongoing exams found');
//         return res.status(404).json({ success: false });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }
const getStudentOngoing = async (req, res) => {
    try {
        const currentTime = new Date(); // Get current UTC time
        const todayDate = currentTime.toISOString().slice(0, 10); // Get today's date in "YYYY-MM-DD" format

        const student = await User.findOne({ email: req.user.email });

        // Find exams where current time is between startTime and endTime and the exam is today
        const ongoingExams = await Exam.find({
            sem: student.sem,
            branch: student.branch,
            date: todayDate, // Exam date is today
            startTime: { $lte: currentTime }, // Exam starts before or at current time
            endTime: { $gt: currentTime } // Exam ends after current time
        });

        return res.status(200).json({ exam: ongoingExams, success: true });
    } catch (error) {
        console.error('Error fetching ongoing exams:', error);
        throw error; // Propagate error to the caller
    }
};

const deleteExam = async (req, res) => {
    try {
        const { examId } = req.params;
        const deletedExam =await Exam.findByIdAndDelete(examId);
        res.status(200).json({ deletedExam, success: true });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

const getStudentExams = async (req, res) => {
    try {
        const student = await User.findOne({ email: req.user.email });
        const { sem, branch } = student;

        const currentDateTime = new Date();

        const exams = await Exam.find({
            sem,
            branch,
            date: currentDateTime.toISOString().split('T')[0], // Filter by current date
            startTime: { $gte: currentDateTime } // Filter by exams starting after current time
        }).populate('scheduledBy', "fname lname");

        res.status(200).json({ exams, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

    

const getUpcomingExams = async (req, res) => {
    try {
            const student = await User.findOne({ email: req.user.email });
            const { sem, branch } = student;

            // Get today's date
            const today = new Date().toISOString().split('T')[0];
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const nextDay = tomorrow.toISOString().split('T')[0];

            // Find exams scheduled for the future (after today)
            const upcomingExams = await Exam.find({
                sem,
                branch,
                date: { $gte: nextDay }
            }).sort({ date: 1 }).populate('scheduledBy', "fname lname");

            res.status(200).json({ exams: upcomingExams, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getInstructorExam = async (req, res) => {
    try {
        const instructor = await User.findOne({ email: req.user.email });
        const exams = await Exam.find({ scheduledBy: instructor._id });

        return res.status(200).json({ exams, success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error, message: 'Internal Server Error' });
    }

}

const getOngoingExam = async (req, res) => {
    try {
        const instructor = await User.findOne({ email: req.user.email });
        const exams = await Exam.find({ scheduledBy: instructor._id });

        const currentTime = new Date();
        for (const exam of exams) {
            const startTime = new Date(exam.startTime);
            const endTime = new Date(exam.endTime);
            if (currentTime >= startTime && currentTime <= endTime) {
                return res.status(200).json({ exam, success: true });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error, message: 'Internal Server Error' });

    }

};



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/exams');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


module.exports = { uploadExam, storage, getStudentExams, getInstructorExam, getUpcomingExams, getOngoingExam, getStudentOngoing, deleteExam };