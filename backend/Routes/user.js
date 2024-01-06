const express = require('express');
const { getUsers, registerUsers, loginUser } = require('../Controllers/user');
const router = express.Router();

router.get('/all', getUsers);
router.post('/register', registerUsers);
router.post('/login', loginUser)

module.exports = router;