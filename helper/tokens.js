let jwt = require("jsonwebtoken");
let config = require("../config.json");
var mongoose = require("mongoose");
let ERROR = require("./errorMessages");
let log = require("./logger");
var userSession = mongoose.model("UserSession");

module.exports = {
  encrypt: function (req, user) {
    console.log("user", user);
    return new Promise((resolve, reject) => {
      userSession
        .updateMany(
          {
            userId: user._id,
          },
          {
            status: "deleted",
          },
          { $new: true }
        )
        .then((resSessionUpdate) => {
          var data = {
            userId: user._id,
            userAgent: req.get("User-Agent"),
          };
          var userSessionAdd = new userSession(data);
          user["sessionId"] = userSessionAdd._id;
          userSessionAdd.userToken = "JWT " + jwt.sign(user, config.secretKey);
          userSessionAdd
            .save()
            .then((resSession) => {
              resolve({ token: resSession.userToken });
            })
            .catch((error) => {
              log.debug(error);
              reject(ERROR.SOMETHING_WENT_WRONG);
            });
        })
        .catch((error) => {
          log.debug(error);
          reject(ERROR.SOMETHING_WENT_WRONG);
        });
    });
  },
  decrypt: function (req, userToken) {
    return new Promise((resolve, reject) => {
      var userData = jwt.verify(userToken, config.secretKey);
      // console.log("userData", userData)
      userSession
        .findOne({
          _id: userData.sessionId,
          status: { $ne: "deleted" },
          userAgent: req.headers["user-agent"],
        })
        .then((resData) => {
          if (resData) {
            console.log("resData==================token", resData);
            req["userId"] = userData._id;
            req["sessionId"] = userData.sessionId;
            req["designation"] = userData.designation;
            resolve();
          } else {
            reject(ERROR.UNAUTHORIZED);
            // console.log("error==================token");
          }
        })
        .catch((error) => {
          log.error(error);
          console.log("error==================token");

          reject(ERROR.SOMETHING_WENT_WRONG);
        });
    });
  },
};
