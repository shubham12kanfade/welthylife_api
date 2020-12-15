const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Clinic = new Schema({
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Clinic', Clinic);