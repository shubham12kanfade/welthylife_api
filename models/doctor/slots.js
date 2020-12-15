const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Slots = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    slots: [
        {
            session1Start: String,
            session1End: String,
            session2Start: String,
            session2End: String,
            duration: {
                type: Number,
                default: 30
            },
            day: String,
            isOff: {
                type: Boolean,
                default: false
            },
            isHoliday: {
                type: Boolean,
                default: false
            }
        }
    ],
    slots: Array,
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Slots', Slots);