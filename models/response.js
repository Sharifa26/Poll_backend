const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    poll_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'polls',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    option_selected: {
        type: String,
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

let Responses = mongoose.model("responses", Schema);
module.exports = Responses;
