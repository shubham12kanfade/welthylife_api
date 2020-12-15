const mongoode = require("mongoose");
var Users = mongoode.model("User");
var Slots = mongoode.model("Slots");
var DoctorsQualification = mongoode.model("DoctorsQualification");
var CustomerReviews = mongoode.model("CustomerReviews");

const geolib = require("geolib");

module.exports = {
  getNearestDoctorList: (filter) => {
    return new Promise(function (resolve, reject) {
      Users.find({
        designation: "Doctor",
      })
        .then((resData) => {
          var result = resData
            .filter((ele) => {
              return geolib.isPointWithinRadius(
                { latitude: ele.location.lat, longitude: ele.location.lng },
                { latitude: filter.lat, longitude: filter.lng },
                10000
              );
            })
            .resolve(result);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  getBy: () => {
    return new Promise(function (resolve, reject) {
      Users.find({
        designation: "Doctor",
        status: { $ne: "deleted" },
        fees: { $ne: null },
        isVerified: "Yes",
      })
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  getQualification: (id) => {
    return new Promise(function (resolve, reject) {
      DoctorsQualification.find({ doctorId: id })
        .populate("QualificationId")
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  avgStars: (id) => {
    console.log("id", id);
    return new Promise(function (resolve, reject) {
      CustomerReviews.aggregate([
        { $match: { doctorId: mongoode.Types.ObjectId(id) } },
        { $group: { _id: "$doctorId", AverageStars: { $avg: "$stars" } } },
      ])
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  checkValidity: (id) => {
    return new Promise((resolve, reject) => {
      var f1 = "incomplete",
        f2 = "incomplete",
        f3 = "incomplete",
        isSlot = false,
        identyty = false;
      Users.findById(id)
        .then((resData) => {
          if (
            resData.registrationNumber &&
            resData.registrationYear &&
            resData.registrationCouncil
          ) {
            f1 = "completed";
          }
          if (resData.identityFile.length == 2) {
            identyty = true;
          }
          if (
            identyty &&
            resData.registrationProff &&
            resData.establishmentProff
          ) {
            f2 = "completed";
          }
          Slots.findOne({ userId: id })
            .then((slotData) => {
              if (slotData) {
                isSlot = true;
                console.log("resData.fees", resData.fees);
                console.log("resData.fees", resData.fees);
                console.log("isSlot", isSlot);
                if (resData.fees && resData.establishmentHour && isSlot) {
                  f3 = "completed";

                  var data = {
                    form1: f1,
                    form2: f2,
                    form3: f3,
                  };
                  console.log("+++++++DATA++++++", data);
                  resolve(data);
                }
              }
            })
            .catch((err) => {
              console.log("cannot get slot data ", err);
            });
        })
        .catch((err) => {
          console.log("err", err);
          reject(err);
        });
    });
  },
};
