const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ClinicFacilities = new Schema({
    locationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Location'
    },
    facilityId: {
        type: mongoose.Types.ObjectId,
        ref: 'Facilities'
    }

}, {
    timestamps: true
});
module.exports = mongoose.model('ClinicFacilities', ClinicFacilities);