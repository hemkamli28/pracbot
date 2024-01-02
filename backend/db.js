const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/practicalexamdb', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Connected to Database!');
    } catch (error) {
        console.log("Failed to connect!", error.message);
    }

}

module.exports = connectDB;