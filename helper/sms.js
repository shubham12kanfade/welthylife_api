var http = require("http");
let config = require("../config.json");
let request = require("request");

module.exports = function (mobileNumber, otp) {
  return new Promise((resolve, reject) => {
    // var options = {
    //   method: "GET",
    //   url: "http://173.212.215.12/app/smsapi/index.php?key=35E4D4717B8F4F&campaign=9260&routeid=30&type=text&contacts=" +
    //     mobileNumber +
    //     "&senderid=QLORON&msg=" +
    //     otp +
    //     " is your one time password for WealthyLife. This OTP will expire after 10 minutes ",
    //   headers: {
    //     "content-type": "application/x-www-form-urlencoded",
    //   },
    //   form: {},
    // };

    var options = {
      method: "POST",
      url: "http://alerts.preconetindia.com/api/v4/?api_key=A2ca796d4fde98fb49ae9a890dca9f9d7&method=sms&message=" + otp + "sms&to=" + mobileNumber + " is your one time password for WealthyLife. This OTP will expire after 10 minutes" + "&sender=BULKSMS",
    }
    request(options, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        console.log(body);
        resolve(true);
      }
    });
  });
};