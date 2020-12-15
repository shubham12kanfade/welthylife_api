const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const catagoryController = require("../../controllers/products/productCatagory");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const ProductCatagories = mongoose.model("ProductCatagories");

router.post("/", (req, res) => {
  log.debug("/api/");
  crudController
    .add(ProductCatagories, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getAll/by/:type", (req, res) => {
  log.debug("/api'''''''''''''''''''''''''/");
  crudController
    .getBy(ProductCatagories, { type: req.params.type })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getOne(ProductCatagories, { _id: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/all/catagorydata", (req, res) => {
  log.debug("/api/");
  catagoryController
    .getcatData()
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
    .updateBy(ProductCatagories, req.params.id, req.body)
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
    .delete(ProductCatagories, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
