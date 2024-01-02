const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const paperRoutes = require('./Routes/paper')
const app = express();
const port = 5000;

connectDB();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// app.use('/user', userRoutes);
app.use('/paper', paperRoutes);

app.listen(port, ()=>{
    console.log(`Application started on port ${port}!`);
})