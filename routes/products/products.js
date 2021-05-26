const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const Product = mongoose.model("Product");

router.post("/", (req, res) => {
  log.debug("/api/");

  crudController
    .add(Product, req.body)
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
    .getAll(Product)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/catagory", (req, res) => {
  log.debug("/api/");
  crudController
    .getBy(Product, req.body)
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
    .getOne(Product, { _id: req.params.id })
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
    .updateBy(Product, req.params.id, req.body)
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
    .delete(Product, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/feature/product", (req, res) => {
  log.debug("/api/feature/product");
  crudController
    .getBy(Product, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/popular/product", (req, res) => {
  log.debug("/api/feature/product");
  crudController
    .getBy(Product, {
      isFeatureProduct: "Yes",
    })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/catagoryName", (req, res) => {
  log.debug("/api/");
  crudController
  .getBy(Product, { categoryName: req.body.search})
  .then((products) => {
    response.successResponse(res, 200, products);
  })
  .catch((error) => {
    log.error(error);
    response.errorResponse(res, 500);
  });
});

module.exports = router;
