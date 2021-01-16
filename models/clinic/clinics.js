const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Clinic = new Schema({
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    phone: String,
    email: {
        type: String,
        unique: true
    },
    icon: String,
    description: String,
    title: String,
    images: Array,
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Clinic', Clinic);