const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const ProductSubCatagories = mongoose.model("ProductSubCatagories");

router.post("/", (req, res) => {
  log.debug("/api/");
  crudController
    .add(ProductSubCatagories, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/", (req, res) => {
  log.debug("/api/");
  crudController
    .getAll(ProductSubCatagories)
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
    .getOne(ProductSubCatagories, { _id: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/catagory/:catagoryId", (req, res) => {
  log.debug("/api/");
  crudController
    .getOne(ProductSubCatagories, { catagoryId: req.params.catagoryId })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/:id", (req, res) => {
  log.debug("/api/:id");
  crudController
    .updateBy(ProductSubCatagories, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .delete(ProductSubCatagories, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
