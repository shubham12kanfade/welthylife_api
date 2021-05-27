const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const ContactUs = new Schema({
    title: String,
    name: String,
    email: String,
    mobile: String,
    subject: String,
    message: String,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("ContactUs", ContactUs);