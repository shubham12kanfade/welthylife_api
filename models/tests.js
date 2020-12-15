const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Test = new Schema({
    testName: String,
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    fees: String,
    location: {
        address: String,
        landmark: String,
        state: String,
        city: String,
        pincode: Number,
        country: String,
        lat: {
            type: String,
            require: true
        },
        lng: {
            type: String,
            require: true
        },
    },
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Test', Test);