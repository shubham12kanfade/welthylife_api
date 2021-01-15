const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Facilities = new Schema({
    title: String,
}, {
    timestamps: true
});
module.exports = mongoose.model('Facilities', Facilities);