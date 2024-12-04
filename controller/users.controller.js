const Users = require('../models/users');
const InvalidParamException = require('../exceptions/invalid.param.exception');
const InvalidRequestException = require('../exceptions/invalid-request');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Reagister a new user
const register = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {

            const usersData = await Users.findOne({ username: request.body.username })
            if (usersData) {
                throw new InvalidRequestException('username already taken tryanother')
            }
            const hashedPassword = await bcrypt.hash(request.body.password, 10);

            const UserData = {
                username: request.body.username,
                password: hashedPassword,
                age: request.body.age,
                gender: request.body.gender,
                location: request.body.location
            }
            const userDataPayload = await Users.create(UserData)
            resolve(
                response.json({
                    success: true,
                    message: 'user registered successfully',
                    result: userDataPayload
                })
            )
        } catch (error) {
            next(error)
        }
    })
}

// Login a user
const login = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { username, password } = request.body;

            // Find the user by username
            const user = await Users.findOne({ username });
            if (!user) {
                throw new InvalidParamException('Invalid credentials (incorrect username)');
            }

            // Verify the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new InvalidParamException('Invalid credentials (incorrect password)');
            }

            // Generate a token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

            resolve(
                response.json({
                    success: true,
                    message: 'Login successful',
                    token,
                })
            );
        } catch (error) {
            next(error);
        }
    });
};

// Authenticate the user
const authenticate = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = request.headers.authorization;
            if (!token) {
                throw new InvalidRequestException('Access denied');
            }

            // Verify the token
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            request.user = payload;

            resolve(next()); // Proceed to the next middleware/handler
        } catch (error) {
            next(error);
        }
    });
};

// Get user by token
const getUser = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the user by their ID from the decoded JWT payload
            const user = await Users.findById(request.user.userId).populate('polls_voted');

            if (!user) {
                throw new InvalidRequestException('User not found');
            }

            resolve(
                response.json({
                    success: true,
                    message: 'User fetched successfully',
                    polls: user,
                })
            );
        } catch (error) {
            next(error);
        }
    });
};

module.exports = { register, login, authenticate, getUser };

