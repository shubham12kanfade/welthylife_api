const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const ClinicMember = mongoose.model("ClinicMember");
const clinicController = require("../../controllers/clinic/clinic");

let auth = require("../../helper/auth");
let _ = require("lodash");



router.get("/all/members/:clinicId", (req, res) => {
    log.debug("/api/");
    clinicController
        .getBy(ClinicMember, { clinicId: req.params.clinicId })
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.post("/", (req, res) => {
    log.debug("/api/profile/details");
    crudController
        .add(ClinicMember, req.body)
        .then((userData) => {
            console.log("userData", userData)
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.put("/update/by:id", (req, res) => {
    log.debug("/api/");
    crudController
        .updateBy(ClinicMember, { _id: req.paramsms.id }, req.body)
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});





router.post("/delete/by/:id", auth, (req, res) => {
    log.debug("/api/");
    crudController
        .delete(ClinicMember, req.body)
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});



module.exports = router;