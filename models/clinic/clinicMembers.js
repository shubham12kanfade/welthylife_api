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
    }

}, {
    timestamps: true
});
module.exports = mongoose.model('ClinicMember', ClinicMember);