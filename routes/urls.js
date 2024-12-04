const express = require('express')
const router = express.Router()
const { register, login, authenticate, getUser } = require('../controller/users.controller')

router.post('/v2/register', register);
router.post('/v2/login', login);
router.get('/v2/user', authenticate, getUser);

module.exports = router