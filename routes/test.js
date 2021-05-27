const router = require("express").Router();
const crudController = require("../controllers/commonController/crudController");
const doctorController = require("../controllers/doctor/doctor");
const log = require("../helper/logger");
const response = require("../helper/response");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Test = mongoose.model("Test");

let auth = require("../helper/auth");
let _ = require("lodash");


router.post("/add", auth, (req, res) => {
    log.debug("/api/profile/details");
    crudController
        .add(Test, req.body)
        .then((testData) => {
            response.successResponse(res, 200, testData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get("/", (req, res) => {
    log.debug("/api/");
    crudController
        .getWithSortBy(Test, { _id: req.params.id }, { _id: 1 })
        .then((testData) => {
            response.successResponse(res, 200, testData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get("/list/by/:patient", (req, res) => {
    log.debug("/api/");
    crudController
        .getBy(Test, { _id: req.params.id })
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get("/prime/nonePrime/:type", auth, (req, res) => {
    log.debug("/api/");
    crudController
        .getWithSortBy(
            User, { doctorType: req.params.type, designation: "Doctor" }, { isOnline: 1 }
        )
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.post("/add/doctor", auth, (req, res) => {
    log.debug("/api/");
    crudController
        .add(User, req.body)
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get("/online/list", (req, res) => {
    log.debug("/api/");
    crudController
        .getWithSortBy(
            User, {
                isOnline: true,
                designation: "Doctor",
                isMobileVerified: "Verified",
                isEmailVerified: "Verified",
            }, { updatedAt: 1 }
        )
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.post("/nearest/list", (req, res) => {
    log.debug("/api/");
    doctorController
        .getNearestDoctorList(req.body)
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get("/:id", (req, res) => {
    log.debug("/api/");
    crudController
        .getOne(User, { _id: req.params.id })
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.put("/:id", auth, (req, res) => {
    log.debug("/api/:id");
    var doctorData = _.pick(req.body, fields);
    crudController
        .updateBy(User, req.params.id, doctorData)
        .then((userData) => {
            delete userData.otp;
            delete userData.password;
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});
router.put("/update/my/profile", auth, (req, res) => {
    log.debug("/api/update/my/profile");
    var doctorData = _.pick(req.body, fields);
    crudController
        .updateBy(User, req.userId, doctorData)
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.delete("/:id", auth, (req, res) => {
    log.debug("/api/");
    crudController
        .delete(User, req.params.id)
        .then((userData) => {
            response.successResponse(res, 200, userData);
        })
        .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.post("/search/testByName", (req, res) => {
    log.debug("/api/");
    var search = req.body.search
    crudController
      .getBy(IndivisualTests, { title: {"$regex": search, $options: "i", }})
      .then((resData) => {
        response.successResponse(res, 200, resData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });
module.exports = router;