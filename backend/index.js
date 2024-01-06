const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const paperRoutes = require('./Routes/paper');
const userRoutes = require('./Routes/user');
const examRoutes = require('./Routes/exam');
const app = express();
const port = 5000;

connectDB();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// app.use('/user', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/paper', paperRoutes);
app.use('/exam', examRoutes);
app.use('/user', userRoutes);

app.listen(port, ()=>{
    console.log(`Application started on port ${port}!`);
})