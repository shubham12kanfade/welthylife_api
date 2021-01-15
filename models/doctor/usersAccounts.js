const {
    stream
} = require("winston");

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const UsersAccounts = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    bankName: String,
    AccNo: String,
    ifscCode: String,
    panNo: String,
}, {
    timestamps: true,
});
module.exports = mongoose.model("UsersAccounts", UsersAccounts);