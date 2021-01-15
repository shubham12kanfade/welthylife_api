const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");

const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const Qualification = mongoose.model("Qualification");
const ClinicFacilities = mongoose.model("ClinicFacilities");
let auth = require("../../helper/auth");
let _ = require("lodash");

router.get("/all/:id", auth, (req, res) => {
    crudController
        .getbySortByPopulate(
            ClinicFacilities, {
                locationId: req.params.id
            },
            "facilityId"
        )
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get("/by/:id", auth, (req, res) => {
    crudController
        .getbySortByPopulate(
            ClinicFacilities, {
                doctorId: req.params.id
            },
            "qualificationId"
        )
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.post("/add", auth, (req, res) => {

    ClinicFacilities.deleteMany({
            locationId: req.body.locationId
        })
        .then((resData) => {
            var obj = [];

            Array.from(req.body.facilityArray).forEach((ele) => {
                obj.push({
                    locationId: req.body.locationId,
                    title: ele,

                });
            });
            console.log("obj=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", obj);
            crudController
                .insertMultiple(ClinicFacilities, obj)
                .then((resData) => {
                    response.successResponse(res, 200, resData);
                })
                .catch((error) => {
                    log.error(error.code);
                    response.errorResponse(res, parseInt(error.code));
                });
        })
        .catch((err) => {
            log.error(err.code);
            response.errorResponse(res, 500);
        });
});
module.exports = router;