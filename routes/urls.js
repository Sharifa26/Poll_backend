const express = require('express')
const router = express.Router()
const { create,} = require('../controller/users.controller')

router.post('/v2/users', create);
module.exports = router