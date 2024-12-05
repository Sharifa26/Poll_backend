const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [
        {
            text: {
                type: String,
            },
            votes: {
                type: Number,
                default: 0
            },
        },
    ],
    expiration_date: {
        type: Date
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
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

let Polls = mongoose.model("polls", Schema);
module.exports = Polls;
