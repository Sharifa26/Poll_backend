const Polls = require('../models/polls');
const InvalidParamException = require('../exceptions/invalid.param.exception');
const InvalidRequestException = require('../exceptions/invalid-request');
const { options } = require('../routes/urls');


// Create a new poll
const createPoll = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Id = request.user.userId;
            const pollData = {
                question: request.body.question,
                options: request.body.options,
                expiration_date: new Date('2026-12-31'),
                created_by: Id,
            };
            // Validate the input
            if (!pollData.question || !pollData.options || !pollData.expiration_date) {
                throw new InvalidRequestException('Missing required fields');
            }
            if (pollData.options.length < 2) {
                throw new InvalidRequestException('Minimum 2 options are required');
            }

            // Create a new poll
            const poll = await Polls.create(pollData);
            resolve(
                response.json({
                    success: true,
                    message: 'Poll created successfully',
                    poll,
                })
            );
        } catch (error) {
            next(error);
        }
    });
};

// Get all polls
const getAllPolls = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const polls = await Polls.find({ is_deleted: false });
            resolve(
                response.json({
                    success: true,
                    message: 'Polls fetched successfully',
                    total: polls.length,
                    polls,
                })
            );
        } catch (error) {
            next(error);
        }
    });
};

// get all polls by user
const getAllPollsByUser = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const polls = await Polls.find({ created_by: request.user.userId, is_deleted: false });
            resolve(
                response.json({
                    success: true,
                    message: 'Polls fetched successfully',
                    total: polls.length,
                    polls,
                })
            );
        } catch (error) {
            next(error);
        }
    });
};

// polls voting
const pollsVoting = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const id = request.params.id;
            const optionIndex = request.body.optionIndex;
            const polls = await Polls.findById(id);
            if (!polls) {
                throw new InvalidParamException('Poll not found');
            }
            const voteData = await Polls.updateOne(
                { _id: id, options: options[optionIndex]  },
                { options: { votes: votes + 1 } } ,
            );
            resolve(
                response.json({
                    success: true,
                    message: 'voted successfully'
                })
            );
        } catch (error) {
            next(error);
        }
    });
};

module.exports = { createPoll, getAllPolls, getAllPollsByUser, pollsVoting };