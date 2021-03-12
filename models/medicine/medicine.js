const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const Medicine = new Schema({
    title: String,
    description: String,
    image: Array,
    highlights: Array,
    mrp: Number,
    discountOffer: String,
    packSize: Array,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("Medicine", Medicine);