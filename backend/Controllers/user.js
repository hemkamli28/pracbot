const User = require("../Models/user")

const getUsers = () =>{
    try {
        const users = User.find();
        res.status(200).json({users, success: true});
    } catch (error) {
        res.status(500).json({ error:error, message: 'Internal Server Error' });
        console.log(error);
    }
}

module.exports = {getUsers}