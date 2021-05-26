const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Banner = new Schema( 
  {
    url: String,
    title: String,
    pageName: String,
    paragraph: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Banner", Banner);