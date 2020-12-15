const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Location = new Schema({
    clinicId: {
        type: mongoose.Types.ObjectId,
        ref: 'Clinic'
    },
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
}, {
    timestamps: true
});
module.exports = mongoose.model('Location', Location);