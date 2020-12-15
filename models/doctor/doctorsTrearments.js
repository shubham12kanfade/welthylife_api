const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const DoctorsTreatments = new Schema({
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    treatmentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Treatment'
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('DoctorsTreatments', DoctorsTreatments);