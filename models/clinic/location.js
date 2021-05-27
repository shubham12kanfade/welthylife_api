const {
    stream
} = require('winston');

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Location = new Schema({
    clinicId: {
        type: mongoose.Types.ObjectId,
        ref: 'Clinic'
    },
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    address: String,
    landmark: String,
    locality : String,
    state: String,
    city: String,
    pincode: Number,
    country: String,
    lat: {
        type: String,
    },
    lng: {
        type: String,
    },
    facilities: Array,
    status: {
        type: String,
        default: "active"
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Location', Location);