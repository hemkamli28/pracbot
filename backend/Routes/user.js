const express = require('express');
const { getUsers, registerUsers, loginUser } = require('../Controllers/user');
const router = express.Router();
const { authUser } = require('../Middlewares/authUser');
const { authRole } = require('../Middlewares/authRole');

router.get('/all', authUser, authRole('admin') ,getUsers);
router.post('/register', registerUsers);
router.post('/login', loginUser);


module.exports = router;