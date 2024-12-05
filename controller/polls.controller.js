const InvalidParamException = require('../exceptions/invalid.param.exception');
const InvalidRequestException = require('../exceptions/invalid-request');
const Polls = require('../models/polls');
const Users = require('../models/users');

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
            const Id = request.user.userId;
            const pollId = request.params.id; // Poll ID from the request URL
            const optionIndex = request.body.optionIndex; // Option index from the request body

            // Validate the option index
            if (optionIndex === undefined || optionIndex < 0) {
                throw new InvalidRequestException('Invalid option index');
            }

            // Find the poll by ID
            const poll = await Polls.findById(pollId);

            if (!poll) {
                throw new InvalidParamException('Poll not found');
            }

            //Ensure the poll is active
            if (poll.is_deleted) {
                throw new InvalidRequestException('This poll has been deleted');
            }
            if (!poll.is_active) {
                throw new InvalidRequestException('This poll is no longer active');
            }

            // Ensure the optionIndex is valid
            if (optionIndex >= poll.options.length) {
                throw new InvalidRequestException('Invalid option index');
            }

            // Check if the user has already voted on this poll
            const user = await Users.findById(Id);

            if (user.polls_voted.includes(pollId)) {
                throw new InvalidRequestException('You have already voted on this poll');
            }

            // Increment the votes for the selected option
            poll.options[optionIndex].votes += 1;

            // Save the updated poll
            await poll.save();

            // Update the user's polls_voted field
            user.polls_voted.push(pollId);
            await user.save();

            resolve(
                response.json({
                    success: true,
                    message: 'Voted successfully'
                })
            );
        } catch (error) {
            next(error);
        }
    });
};


module.exports = { createPoll, getAllPolls, getAllPollsByUser, pollsVoting };