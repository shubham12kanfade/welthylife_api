let mongoose = require("mongoose");
let connection = require("../helper/database");
let log = require("../helper/logger");
let ERRORS = require("../helper/errorMessages");

let User = mongoose.model("User");
let Token = mongoose.model("Token");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}
module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      log.debug("register");
      User.findOne({
        $or: [{ email: data.email }, { mobileNumber: data.mobileNumber }],
      })
        .then((resUser) => {
          if (resUser) {
            reject(ERRORS.USER_ALREADY_REGISTERED);
          } else {
            bcrypt.genSalt(saltRounds, function (err, salt) {
              bcrypt.hash(data.password, salt, function (err, hash) {
                data["password"] = hash;
                var user = new User(data);
                user
                  .save()
                  .then((resData) => {
                    resolve(resData);
                  })
                  .catch((error) => {
                    log.error(error);
                    reject(ERRORS.SOMETHING_WENT_WRONG);
                  });
              });
            });
          }
        })
        .catch((error) => {
          log.error(error);
          reject(ERRORS.SOMETHING_WENT_WRONG);
        });
    });
  },
  loginWithSocial: (data) => {
    console.log("+++++++++++++++", data);
    return new Promise((resolve, reject) => {
      var object = {};
      if (data.hasOwnProperty("email")) {
        object["email"] = data.email;
      } else {
        object["socialId"] = data.id;
      }
      User.findOne({ ...object, status: { $ne: "deleted" } }).then(
        (resUser) => {
          if (resUser) {
            resolve(resUser);
          } else {
            var obj = {
              email: data && data.email ? data.email : null,
              firstName: data.firstName,
              lastName: data.lastName,
              socialId: data.id,
              designation: "User",
              avatar: data.avatar,
            };
            var user = new User(obj);
            user
              .save()
              .then((resData) => {
                resolve(resData);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      );
    });
  },

  login: (user) => {
    return new Promise((resolve, reject) => {
      log.info("user", user);
      var object = {};
      if (isNumeric(user.email)) {
        object["mobileNumber"] = user.email;
      } else {
        object["email"] = user.email;
      }
      User.findOne({
        ...object,
        status: { $ne: "deleted" },
      })
        .then((resData) => {
          console.log("resData", resData);
          if (!resData) {
            reject(ERRORS.EMAIL_NOT_FOUND);
          } else {
            if (resData.isMobileVerified !== "Verified") {
              reject(ERRORS.MOBILE_NOT_VERIFIED);
            } else {
              bcrypt.compare(user.password, resData.password, function (
                err,
                result
              ) {
                if (result) {
                  User.findByIdAndUpdate(
                    { _id: resData._id },
                    { isOnline: true },
                    { $new: true }
                  )
                    .then((response) => {
                      delete resData.password;
                      delete resData.location;
                      resolve(resData);
                    })
                    .catch((error) => {
                      reject(ERRORS.PASSWORD_WRONG);
                    });
                } else {
                  reject(ERRORS.PASSWORD_WRONG);
                }
              });
            }
          }
        })
        .catch((error) => {
          log.error(error);
          reject(ERRORS.SOMETHING_WENT_WRONG);
        });
    });
  },
  verifyEmail: (email) => {
    return new Promise((resolve, reject) => {
      log.info("user", email);
      User.findOneAndUpdate(
        {
          encryptedEmail: email,
        },
        {
          isEmailVerified: "Verified",
          encryptedEmail: null,
        },
        { new: true }
      )
        .then((resData) => {
          if (resData) {
            log.info("resData", resData);
            resolve(resData);
          } else {
            reject(ERRORS.EMAIL_NOT_FOUND);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  verifyMobile: (mobile, otp) => {
    return new Promise((resolve, reject) => {
      log.info("user", mobile, otp);
      User.findOneAndUpdate(
        {
          mobileNumber: mobile,
          otp: otp,
        },
        {
          isMobileVerified: "Verified",
          otp: null,
        },
        { new: true }
      )
        .then((resData) => {
          if (resData) {
            resolve(resData);
          } else {
            reject(ERRORS.WRONG_OTP);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // checkMobileNo: (userMobile) => {
  //     log.debug(userMobile);
  //     return new Promise((resolve, reject) => {
  //         User.findOne({
  //             mobileNumber: userMobile,
  //             status: { $ne: 'Deleted' }
  //         })
  //             .then((userData) => {
  //                 resolve(userData);
  //             })
  //             .catch((err) => {
  //                 log.debug(err);
  //                 reject(err);
  //             });
  //     });
  // },
  // getOTP: (userMobile) => {
  //     return new Promise((resolve, reject) => {
  //         User.findOne({
  //             mobileNumber: userMobile,
  //             status: { $ne: 'Deleted' }
  //         })
  //             .then((userData) => {
  //                 resolve(userData);
  //             })
  //             .catch((err) => {
  //                 log.debug(err);
  //                 reject(err);
  //             });
  //     });
  // },
  updateToken: (data) => {
    return new Promise((resolve, reject) => {
      Token.findOneAndUpdate(
        {
          mobileNumber: mobileNumber,
          status: { $ne: "Deleted" },
        },
        {
          otp: OTP,
        },
        {
          new: true,
        }
      )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          log.debug(err);
          reject(err);
        });
    });
  },
  // loginWithMobile: (mobile, otp) => {
  //     return new Promise((resolve, reject) => {
  //         User.findOne({ mobileNumber: mobile, designation: "User" }).then(resData => {
  //             if (resData) {
  //                 User.findByIdAndUpdate({ _id: resData._id }, { otp: otp }, { $new: true }).then(resposeUser => {
  //                     resolve(resposeUser);
  //                 }).catch(error => {
  //                     console.log("error", error);
  //                     reject(error)
  //                 })
  //             } else {
  //                 const data = {
  //                     mobileNumber: mobile,
  //                     otp: otp,
  //                     designation: "User"
  //                 }
  //                 var user = new User(data);
  //                 user.save().then(resOtp => {
  //                     resolve(resOtp);
  //                 }).catch(error => {
  //                     reject(error);
  //                 })
  //             }
  //         }).catch(error => {
  //             console.log("error", error);
  //             reject(error)
  //         })
  //     })
  // }, verifyOTP: (mobile, otp) => {
  //     return new Promise((resolve, reject) => {
  //         User.findOne({ mobileNumber: mobile, otp: otp }).then(verifyOTPRes => {
  //             if (verifyOTPRes) {
  //                 User.findByIdAndUpdate({ _id: verifyOTPRes._id }, { otp: null }, { $new: true }).then(resData => {
  //                     resolve(verifyOTPRes);
  //                 }).catch(error => {
  //                     console.log(error);
  //                     reject(error);
  //                 })
  //             } else {
  //                 reject("wrong OTP, please specify correct OTP");
  //             }
  //         }).catch(error => {
  //             reject(error);
  //         })
  //     })
  // }
};
