const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const DoctorsSpecialization = new Schema({
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    specializationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Specialization'
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('DoctorsSpecialization', DoctorsSpecialization);