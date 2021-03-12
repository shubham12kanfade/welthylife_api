const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
let mail = require("./../sendmail/notify");
const config = require("../../config.json")
const Medicine = mongoose.model("Medicine");
router.post("/add", (req, res) => {
    log.debug("/api/add/medicine");
    crudController
        .add(Medicine, req.body)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get("/get/medicine", (req, res) => {
    log.debug("/api/get/medicine");
    crudController
        .getAll(Medicine)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});
module.exports = router;