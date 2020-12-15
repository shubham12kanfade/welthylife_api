const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Logs = new Schema({
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    logMessage: String,
    logObject: Object
}, {
    timestamps: true
});
module.exports = mongoose.model('Logs', Logs);