const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Doctors = new Schema({
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Doctors', Doctors);