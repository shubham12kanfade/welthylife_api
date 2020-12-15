const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const MemberLocation = new Schema({
    clinicId: {
        type: mongoose.Types.ObjectId,
        ref: 'Clinic'
    },
    locationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Location'
    },
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true
});
module.exports = mongoose.model('MemberLocation', MemberLocation);