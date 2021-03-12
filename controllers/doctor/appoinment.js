const mongoose = require("mongoose");
var User = mongoose.model("User");
const geolib = require("geolib");
const Appoinment = mongoose.model("Appoinment");
const crudController = require("../commonController/crudController");
let log = require("../../helper/logger");
let mail = require("../../routes/sendmail/notify");
var config = require("../../config.json");
var moment = require("moment");

module.exports = {
  add: (data) => {
    return new Promise(function (resolve, reject) {
      var add = new Appoinment(data);
      add
        .save()
        .then(async (resData) => {
          resolve(resData);
          var petientData, drData;
          petientData = await User.find({
            _id: resData.petient
          });
          drData = await User.find({
            _id: resData.doctor
          });
          var PfName, PlName, Pemel, Pavatar, Pid;
          petientData.forEach((element) => {
            (PfName = element.firstName),
            (PlName = element.lastName),
            (Pemel = element.email),
            (Pavatar = element.avatar),
            (Pid = element._id);
          });

          var DfName, DlName, Demel, Davatar, Did;
          drData.forEach((element) => {
            (DfName = element.firstName),
            (DlName = element.lastName),
            (Demel = element.email);
            (Davatar = element.avatar), (Did = element._id);
          });

          let petientMsg = {
            message: "your Appoinment is set on " +
              resData.date +
              " at " +
              resData.time +
              " with Dr." +
              DlName,
            avatar: Pavatar,
            drId: Did,
            petientId: Pid,
          };
          global.socketIo.emit("petientKey", petientMsg);

          let drMsg = {
            message: "your have new appoinment on " +
              resData.date +
              " at " +
              resData.time +
              " with Mr." +
              PlName,
            avatar: Davatar,
            drId: Did,
            petientId: Pid,
          };
          global.socketIo.emit("drKey", drMsg);

          // var mailConfig = {
          //   from: config.auth.user,
          //   email: Pemel,
          //   subject: "Your Appoinment is Set",
          //   out: "hi, " +
          //     PfName +
          //     " " +
          //     PlName +
          //     " your appoinment is set with Dr." +
          //     DlName +
          //     " kindly check the app for details ",
          // };
          // mail
          //   .sendMail(mailConfig)
          //   .then((resMail) => {
          //     log.info(resMail);
          //   })
          //   .catch((error) => {
          //     log.error(error);
          //   });

          // var mailCon = {
          //   from: config.auth.user,
          //   email: Demel,
          //   subject: "You have an Appoinment",
          //   out: "hi, Dr." +
          //     DfName +
          //     " " +
          //     DlName +
          //     " you have a new appoinment with Mr." +
          //     PlName +
          //     " kindly check the app for details ",
          // };
          // mail
          //   .sendMail(mailCon)
          //   .then((resMail) => {
          //     log.info(resMail);
          //   })
          //   .catch((error) => {
          //     log.error(error);
          //   });
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  getAll: () => {
    return new Promise(function (resolve, reject) {
      Appoinment.find({})
        .populate("petient")
        .populate("doctor")
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  getById: (id) => {
    return new Promise(function (resolve, reject) {
      Appoinment.find(id)
        .populate("doctor")
        .populate("petient")
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  getByTime: (id) => {
    return new Promise(function (resolve, reject) {
      var today = moment().format("DD/MM/YYYY");
      var week = moment().subtract(7, "days").format("DD/MM/YYYY");

      console.log("today===============>", today);
      Appoinment.find({
          $and: [{
            doctor: id
          }, {
            date: today
          }],
        })
        .populate("petient")
        .sort({
          time: -1
        })
        .then((todayData) => {
          Appoinment.find({
              $and: [{
                doctor: id
              }, {
                date: {
                  $gte: week
                }
              }],
            })
            .populate("petient")
            .then((weekData) => {
              Appoinment.find({
                  doctor: id
                })
                .populate("petient")
                .then((AllData) => {
                  resolve({
                    TodayPaitent: todayData,
                    WeeKPaitent: weekData,
                    AllPaitent: AllData,
                  });
                })
                .catch((err) => {
                  console.log("err", err);
                });
            })
            .catch((error) => {
              console.log("error", error);
              reject(error);
            });
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  remindAppoinment: () => {
    return new Promise(function (resolve, reject) {
      var time = moment().add(10, "minutes").format("HH:mm");
      console.log("time", time);

      Appoinment.find({
          time: time
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
};