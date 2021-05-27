const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
let mail = require("./../sendmail/notify");
const config = require("../../config.json")
const MedicalReceipt = mongoose.model("MedicalReceipt");
let auth = require("../../helper/auth");

router.post("/add", auth, (req, res) => {
    req.body["userId"] = req.userId
    log.debug("/api/add/MedicalReceipt");
    crudController
        .add(MedicalReceipt, req.body)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get("/get/MedicalReceipt", (req, res) => {
    log.debug("/api/get/MedicalReceipt");
    crudController
        .getAll(MedicalReceipt)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});
module.exports = router;