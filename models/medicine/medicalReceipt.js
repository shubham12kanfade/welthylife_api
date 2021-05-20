const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const MedicalReceipt = new Schema({
    title: String,
    receiptURL: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("MedicalReceipt", MedicalReceipt);