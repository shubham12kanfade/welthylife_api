const router = require("express").Router();
const crudController = require("../controllers/commonController/crudController");
const doctorController = require("../controllers/doctor/doctor");
const log = require("../helper/logger");
const response = require("../helper/response");
const mongoose = require("mongoose");
let mail = require("./sendmail/notify");
const config = require("../config.json")
const ContactUs = mongoose.model("ContactUs");
let auth = require("../helper/auth");
router.post("/add", (req, res) => {
    log.debug("/api/add/contact");
    crudController
        .add(ContactUs, req.body)
        .then((resData) => {
            var mailConfig = {
                from: config.auth.user,
                email: "letstalk@whealthylife.in",
                subject: "Contact Us",
                out: "a contact us request of " + resData.name + " mobile : " + resData.mobile,
            };
            mail
                .sendMail(mailConfig)
                .then((resMail) => {
                    log.info(resMail);
                })
                .catch((error) => {
                    log.error(error);
                });
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});
module.exports = router;