const Users = require('../models/users');
const InvalidParamException = require('../exceptions/invalid.param.exception');
const InvalidRequestException = require('../exceptions/invalid-request');

// Create a new user
const create = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const UserData = {
                username: request.body.username,
                password: request.body.password,
                age: request.body.age,
                gender: request.body.gender,
                location: request.body.location,
                is_admin: request.body.isAdmin,
                polls_voted: request.body.pollsVoted,
                is_active: request.body.isActive,
                is_deleted: request.body.isDeleted
            }

            const usersData = await Users.findOne({ username: request.body.username })
            if (usersData) {
                throw new InvalidRequestException('username already taken tryanother')
            }
            const userDataPayload = await Users.create(UserData)
            resolve(
                response.json({
                    success: true,
                    message: 'user added successfully',
                    result: userDataPayload
                })
            )
        } catch (error) {
            next(error)
        }
    })
}
const u = {
    "username": "sharifa",
    "password": "sharifa",
    "age": 23,
    "gender": "female",
    "location": "bangalore",
    "is_admin": true,
    "polls_voted": [1, 2, 3],
    "is_active": true,    
    "is_deleted": false 
}
module.exports = { create }

