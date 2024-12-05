const express = require('express')
const router = express.Router()
const { register, login, authenticate, getUser } = require('../controller/users.controller')
const { createPoll, getAllPolls, getAllPollsByUser, pollsVoting } = require('../controller/polls.controller');

router.post('/v2/register', register);
router.post('/v2/login', login);
router.get('/v2/user', authenticate, getUser);
router.post('/v2/polls', authenticate, createPoll);
router.get('/v2/polls', getAllPolls);
router.get('/v2/polls/user', authenticate, getAllPollsByUser);
router.put('/v2/polls/vote/:id', authenticate, pollsVoting);

module.exports = router