const router = require("express").Router();
const crudController = require("../controllers/commonController/crudController");
const response = require("../helper/response");
const mongoose = require("mongoose");
const log = require("../helper/logger");
const TopOffers = mongoose.model("TopOffers");
let auth = require("../helper/auth");
let _ = require("lodash");

router.get("/getAll", (req, res) => {
  crudController
    .getAll(TopOffers)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/by/:id", (req, res) => {
  crudController
    .getBy(TopOffers, { _id: req.params.id })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/membership/offers", (req, res) => {
  crudController
    .getBy(TopOffers, { type: "Membership" })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add", auth, (req, res) => {
  crudController
    .add(TopOffers, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, parseInt(error.code));
    });
});

router.put("/edit/by/:id", (req, res) => {
  crudController
    .updateBy(TopOffers, req.params.id, req.body)
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
    .delete(TopOffers, req.params.id)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
