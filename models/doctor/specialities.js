const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Specialities = new Schema({
    specialitieName: String,
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Specialities', Specialities);