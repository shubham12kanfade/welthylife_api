const mongoode = require("mongoose");
const { parseInt } = require("lodash");
var Slots = mongoode.model("Slots");
var moment = require("moment");

module.exports = {
  getSlots: (id, time) => {
    return new Promise(function (resolve, reject) {
      var day = moment(moment(time, "DD-MM-YYYY")).format("dddd").toLowerCase();
      console.log("day===========>", day);

      Slots.findOne({ userId: id })
        .then((data) => {
          let day = [];
          data.slots.forEach((element) => {
            let morningTime = [];
            let eveningTime = [];
            var st1 = element.session1Start.split(":");
            var et1 = element.session1End.split(":");
            var startTime = st1[0] + ":" + st1[1];
            var sCheck = parseInt(st1[0]) * 100 + parseInt(st1[1]) + 50;
            var eCheck = parseInt(et1[0]) * 100 + parseInt(et1[1]);

            for (let index = 1; sCheck <= eCheck; index++) {
              if (parseInt(st1[1]) == 30) {
                st1[0] = parseInt(st1[0]) + 01;
                st1[1] = "00";
                if (st1[0] < 10) {
                  st1[0] = "0" + st1[0];
                }
              } else {
                st1[1] = parseInt(st1[1]) + 30;
              }
              morningTime.push({
                strtTime: startTime,
                endTime: st1[0] + ":" + st1[1],
              });
              startTime = st1[0] + ":" + st1[1];
              sCheck = sCheck + 50;
            }
            var st2 = element.session2Start.split(":");
            var et2 = element.session2End.split(":");
            var startTime = st2[0] + ":" + st2[1];
            var s2Check = parseInt(st2[0]) * 100 + parseInt(st2[1]);
            var e2Check = parseInt(et2[0]) * 100 + parseInt(et2[1]);
            for (let index = 1; s2Check <= e2Check; index++) {
              if (parseInt(st2[1]) == 30) {
                st2[0] = parseInt(st2[0]) + 01;
                st2[1] = "00";
                if (st1[0] < 10) {
                  st1[0] = "0" + st1[0];
                }
              } else {
                st2[1] = parseInt(st2[1]) + 30;
              }
              eveningTime.push({
                strtTime: startTime,
                endTime: st2[0] + ":" + st2[1],
              });
              startTime = st2[0] + ":" + st2[1];
              s2Check = s2Check + 50;
            }
            day.push({
              //   session: {
              day: element.day,
              //     morningStartTime: element.session1Start,
              //     morningEndTime: element.session1End,
              //     eveningStartTime: element.session2Start,
              //     eveningEndTime: element.session2End,
              //   },
              mrningSlots: morningTime,
              eveningSlots: eveningTime,
            });

            var obj = {};
          });
          console.log("morningTime", day);

          resolve(day);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getTimeSlots: (id, time) => {
    console.log("time###########################>", time);
    return new Promise(function (resolve, reject) {
      var dayString = moment(moment(time, "YYYY-MM-DD"))
        .format("dddd")
        .toLowerCase();

      Slots.findOne({ userId: id })
        .then((data) => {
          let day = [];
          data.slots.forEach((element) => {
            console.log("element", element.day);
            if (element.day == dayString) {
              let morningTime = [];
              let eveningTime = [];
              var st1 = element.session1Start.split(":");
              var et1 = element.session1End.split(":");
              var startTime = st1[0] + ":" + st1[1];
              var sCheck = parseInt(st1[0]) * 100 + parseInt(st1[1]) + 50;
              var eCheck = parseInt(et1[0]) * 100 + parseInt(et1[1]);

              for (let index = 1; sCheck <= eCheck; index++) {
                if (parseInt(st1[1]) == 30) {
                  st1[0] = parseInt(st1[0]) + 01;
                  st1[1] = "00";
                  if (st1[0] < 10) {
                    st1[0] = "0" + st1[0];
                  }
                } else {
                  st1[1] = parseInt(st1[1]) + 30;
                }
                morningTime.push({
                  strtTime: startTime,
                  endTime: st1[0] + ":" + st1[1],
                });
                startTime = st1[0] + ":" + st1[1];
                sCheck = sCheck + 50;
              }
              var st2 = element.session2Start.split(":");
              console.log("st2", st2);
              var et2 = element.session2End.split(":");
              console.log("et2", et2);
              var startTime = st2[0] + ":" + st2[1];
              var s2Check = parseInt(st2[0]) * 100 + parseInt(st2[1]);
              var e2Check = parseInt(et2[0]) * 100 + parseInt(et2[1]);
              for (let index = 1; s2Check <= e2Check; index++) {
                if (parseInt(st2[1]) == 30) {
                  st2[0] = parseInt(st2[0]) + 01;
                  st2[1] = "00";
                  if (st1[0] < 10) {
                    st1[0] = "0" + st1[0];
                  }
                } else {
                  st2[1] = parseInt(st2[1]) + 30;
                }
                eveningTime.push({
                  strtTime: startTime,
                  endTime: st2[0] + ":" + st2[1],
                });
                startTime = st2[0] + ":" + st2[1];
                s2Check = s2Check + 50;
              }
              day.push({
                //   session: {
                day: element.day,
                date: time,
                //     morningStartTime: element.session1Start,
                //     morningEndTime: element.session1End,
                //     eveningStartTime: element.session2Start,
                //     eveningEndTime: element.session2End,
                //   },
                mrningSlots: morningTime,
                eveningSlots: eveningTime,
              });
            }

            var obj = {};
          });
          console.log("morningTime", day);

          resolve(day);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
