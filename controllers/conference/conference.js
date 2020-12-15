const mongoose = require("mongoose");
var ConferenceSession = mongoose.model("conferenceSession");

module.exports = {
  deleteSession: (id) => {
    console.log("id", id);
    return new Promise(function (resolve, reject) {
      ConferenceSession.updateOne(
        {
          patient: id,
          status: { $ne: "deleted" },
        },
        { $set: { status: "deleted" } }
      )
        .then((resData) => {
          resolve(resData);
          var msg = "Session is terminated by another party";
          global.socketIo.emit("endSession", msg);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
};
