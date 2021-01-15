const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Facilities = mongoose.model("Facilities");

let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/", (req, res) => {
    log.debug("/api/profile/details");
    crudController
        .add(Facilities, req.body)
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get("/get/by/:id", (req, res) => {
    log.debug("/api/");
    crudController
        .getBy(Facilities, {
            _id: req.params.id
        })
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.put("/update/by/:id", (req, res) => {
    log.debug("/api/");
    crudController
        .updateBy(Facilities, req.params.id, req.body)
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.put("/delete/by/:id", (req, res) => {
    log.debug("/api/");
    crudController
        .deletePerm(Facilities, req.params.id)
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});



router.get("/all", (req, res) => {
    log.debug("/api/");
    crudController
        .getAll(Facilities)
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
        .deletePerm(Facilities, req.params.id)
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

module.exports = router;