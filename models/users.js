const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    location: {
        type: String
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    polls_voted: {
        type: Array,
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
}, { timestamps: true });

let Users = mongoose.model("users", Schema);
module.exports = Users;
