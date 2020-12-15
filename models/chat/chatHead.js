const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ChatHead = new Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'Active'
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('ChatHead', ChatHead);
