const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const Lab = mongoose.model("Lab");
const LabCenter = mongoose.model("LabCenter");
let auth = require("../../helper/auth");
let _ = require("lodash");

router.get("/get/all", (req, res) => { 
  crudController
    .getAll(Lab)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/cities", (req, res) => {
  LabCenter.aggregate([{ $group: { _id: "$city" } }])
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/featured", (req, res) => {
  crudController
    .getBy(Lab, { isFeatured: true })
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
    .getBy(Lab, { _id: req.params.id })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add", (req, res) => {
  console.log("/add/lab");

  crudController
    .add(Lab, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, 500);
    });
});

router.post("/add/center/details", (req, res) => {
  console.log("/add/lab");
  crudController
    .add(LabCenter, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, 500);
    });
});
router.get("/get/center/by/labId/:id", (req, res) => {
  crudController
    .getBy(LabCenter, { labId: req.params.id })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/center/by/centerId/:id", (req, res) => {
  crudController
    .getOne(LabCenter, { _id: req.params.id })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
router.put("/edit/center/by/:id", (req, res) => {
  crudController
    .updateBy(LabCenter, req.params.id, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
router.delete("/delete/center/by/:id", (req, res) => {
  crudController
    .delete(LabCenter, req.params.id)
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
    .updateBy(Lab, req.params.id, req.body)
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
    .delete(Lab, req.params.id)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/search/labByName", (req, res) => {
  log.debug("/api/");
  var search = req.body.search
  crudController
    .getBy(Lab, { name: {"$regex": search, $options: "i", }})
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
})

module.exports = router;
