const router = require("express").Router();
const crudController = require("../controllers/commonController/crudController");
const response = require("../helper/response");
const mongoose = require("mongoose");
const log = require("../helper/logger");
const HealthFeeds = mongoose.model("HealthFeeds");
const Answers = mongoose.model("Answers");

let auth = require("../helper/auth");
let _ = require("lodash");

router.post("/add", auth, (req, res) => {
  log.debug("/api/");
  req.body["userId"] = req.userId;
  crudController
    .add(HealthFeeds, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .updateBy(Answers, req.params.id, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .delete(HealthFeeds, req.params.id)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/HealthFeeds/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .getBy(HealthFeeds, { userId: req.params.id })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/doctor/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .getbySortByPopulate(HealthFeeds, { userId: req.params.id })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
