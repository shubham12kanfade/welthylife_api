const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ClinicMember = new Schema({
    clinicId: {
        type: mongoose.Types.ObjectId,
        ref: 'Clinic'
    },
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    locationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Location'
    },
    timingId: {
        type: mongoose.Types.ObjectId,
        ref: 'MemberTimings'
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('ClinicMember', ClinicMember);