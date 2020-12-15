const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const TopOffers = new Schema(
  {
    title: String,
    description: String,
    buttonText: String,
    backImg: String,
    backColor: String,
    urlLink: String,
    referenceId: {
      type: mongoose.Types.ObjectId,
    },
    type: {
      type: String,
      enum: ["Labs", "Medicine", "Membership"],
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("TopOffers", TopOffers);
