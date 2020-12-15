let tokens = require("./tokens");
let response = require("./response");
let ERROR = require("./errorMessages");
let log = require("./logger");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  } else {
    console.log("+++++++++++++++++++++++++++++++++ Inside Auth");
    var authHeader = req.headers.authorization;

    if (authHeader && req.headers.authorization.includes("JWT ")) {
      const token = authHeader.split("JWT ")[1];
      tokens
        .decrypt(req, token)
        .then((resData) => {
          console.log("authHeader============>", req.headers.authorization);
          next();
        })
        .catch((error) => {
          response.errorMsgResponse(res, 401, error);
        });
    } else {
      response.errorMsgResponse(res, 401, ERROR.UNAUTHORIZED);
    }
  }
};
