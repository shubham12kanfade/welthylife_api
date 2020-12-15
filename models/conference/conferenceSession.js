const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const conferenceSession = new Schema({
    sessionId: String,
    token: String,
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('conferenceSession', conferenceSession);