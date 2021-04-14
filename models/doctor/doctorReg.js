const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const DoctorReg = new Schema({
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    registerId: {
        type: mongoose.Types.ObjectId,
        ref: "Registration",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("DoctorReg", DoctorReg);