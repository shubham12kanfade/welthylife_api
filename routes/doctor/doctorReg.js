const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");

const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const DoctorReg = mongoose.model("DoctorReg");
const Registration = mongoose.model("Registration");
let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/add", auth, (req, res) => {
    var userId;
    if (req.body.userId) {
        userId = req.body.userId;
    } else {
        userId = req.userId;
    }
    crudController.deleteMulti(DoctorReg, {
        doctorId: userId
    }).then((delData) => {
        console.log("==>delData", delData)
        crudController
            .add(Registration, req.body)
            .then((resData) => {
                console.log("==>resData", resData)
                var obj = {
                    doctorId: userId,
                    registerId: resData._id
                }
                console.log("==>obj", obj)
                crudController.add(DoctorReg, obj).then((data) => {
                    response.successResponse(res, 200, resData);
                }).catch((error) => {
                    log.error(error);
                    response.errorResponse(res, 500);
                })
            })
            .catch((error) => {
                log.error(error);
                response.errorResponse(res, 500);
            });
    }).catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
    });

});

router.post("/adddd", auth, (req, res) => {
    var userId;
    if (req.body.userId) {
        userId = req.body.userId;
    } else {
        userId = req.userId;
    }
    crudController.deleteMulti(DoctorDocs, {
        userId: userId
    }).then((delRes) => {
        crudController

            .add(DoctorDocs, {
                ...req.body,
                userId
            })
            .then((resData) => {
                response.successResponse(res, 200, resData);
            })
            .catch((error) => {
                log.error(error.code);
                response.errorResponse(res, parseInt(error.code));
            });
    }).catch((error) => {
        log.error(error.code);
        response.errorResponse(res, parseInt(error.code));
    })
});


router.get("/all", auth, (req, res) => {
    var userId;
    if (req.body.userId) {
        userId = req.body.userId;
    } else {
        userId = req.userId;
    }
    crudController
        .getBy(DoctorDocs, {
            userId: userId
        })
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get("/by/:userId", auth, (req, res) => {
    console.log("/by/:id==========+++++++++++++");
    crudController
        .getBy(DoctorDocs, {
            userId: req.params.userId
        })
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.put("/edit/by/:id", (req, res) => {
    crudController
        .updateBy(DoctorDocs, req.params.id, req.body)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.delete("/delete/by/:id", (req, res) => {
    crudController
        .delete(DoctorDocs, req.params.id)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

module.exports = router;