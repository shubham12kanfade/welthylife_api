const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const IndivisualTests = mongoose.model("TestMaster");
const labsTests = mongoose.model("labTests");
const LabCenter = mongoose.model("LabCenter");

let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/add", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .add(IndivisualTests, req.body)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add/labTest", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .add(labsTests, req.body)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/all", (req, res) => {
  log.debug("/api/");
  crudController
    .getAll(IndivisualTests)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/testId/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getBy(IndivisualTests, {
      _id: req.params.id
    })
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/labId/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getbySortByTwoPopulate(
      labsTests, {
        labId: req.params.id,
        status: "active"
      },
      "testId",
      "centerId"
    )
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/labTest/all", (req, res) => {
  log.debug("/api/");
  crudController
    .getAll(labsTests)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/labTest/by/:city", (req, res) => {
  log.debug("/api/");
  LabCenter.aggregate([{
        $match: {
          city: req.params.city,
        },
      },
      {
        $lookup: {
          from: "labtests",
          // localField: "profileId",
          // foreignField: "_id",
          let: {
            centerId: "$_id"
          },
          as: "testData",
          pipeline: [{
            $match: {
              $expr: {
                $and: [{
                    $eq: ["$centerId", "$$centerId"]
                  },
                  {
                    $eq: ["$status", "active"]
                  },
                ],
              },
            },
          }, ],
        },
      },
      {
        $unwind: "$testData"
      },
      {
        $lookup: {
          from: "testmasters",
          // localField: "profileId",
          // foreignField: "_id",
          let: {
            testId: "$testData.testId"
          },
          as: "tests",
          pipeline: [{
            $match: {
              $expr: {
                $and: [{
                    $eq: ["$_id", "$$testId"]
                  },
                  {
                    $eq: ["$status", "active"]
                  },
                ],
              },
            },
          }, ],
        },
      },
      {
        $unwind: "$tests"
      },
      // {
      //   $lookup: {
      //     from: "labprofiles",
      //     // localField: "profileId",
      //     // foreignField: "_id",
      //     let: { centerId: "$_id" },
      //     as: "profileData",
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $and: [
      //               { $eq: ["$centerId", "$$centerId"] },
      //               { $eq: ["$status", "active"] },
      //             ],
      //           },
      //         },
      //       },
      //     ],
      //   },
      // },
      // { $unwind: "$profileData" },

      // {
      //   $lookup: {
      //     from: "profilemasters",
      //     // localField: "profileId",
      //     // foreignField: "_id",
      //     let: { profileId: "$profileData.profileId" },
      //     as: "profiles",
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $and: [
      //               { $eq: ["$_id", "$$profileId"] },
      //               { $eq: ["$status", "active"] },
      //             ],
      //           },
      //         },
      //       },
      //     ],
      //   },
      // },
      // { $unwind: "$profiles" },
      // {
      //   $lookup: {
      //     from: "labpackages",
      //     // localField: "profileId",
      //     // foreignField: "_id",
      //     let: { centerId: "$_id" },
      //     as: "packageData",
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $and: [
      //               { $eq: ["$centerId", "$$centerId"] },
      //               { $eq: ["$status", "active"] },
      //             ],
      //           },
      //         },
      //       },
      //     ],
      //   },
      // },
      // { $unwind: "$packageData" },
      // {
      //   $lookup: {
      //     from: "packagemasters",
      //     // localField: "profileId",
      //     // foreignField: "_id",
      //     let: { packageId: "$packageData.packageId" },
      //     as: "packages",
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $and: [
      //               { $eq: ["$_id", "$$packageId"] },
      //               { $eq: ["$status", "active"] },
      //             ],
      //           },
      //         },
      //       },
      //     ],
      //   },
      // },
      // { $unwind: "$packages" },
      {
        $group: {
          _id: "$_id",
          tests: {
            $push: {
              _id: "$testData._id",
              mrp: "$testData.mrp",
              discountOffer: "$testData.discountOffer",
              PPL: "$testData.PPL",
              icon: "$tests.icon",
              title: "$tests.title",
              duration: "$tests.duration",
              details: "$tests.details",
              precautions: "$tests.precautions",
            },
          },
          // profiles: {
          //   $push: {
          //     _id: "$profileData.profileId",
          //     mrp: "$profileData.mrp",
          //     discountOffer: "$profileData.discountOffer",
          //     PPL: "$profileData.PPL",
          //     icon: "$profiles.icon",
          //     title: "$profiles.title",
          //     description: "$profiles.description",
          //     precaution: "$profiles.precaution",
          //   },
          // },
          // packages: {
          //   $push: {
          //     _id: "$packageData.profileId",
          //     mrp: "$packageData.mrp",
          //     discountOffer: "$packageData.discountOffer",
          //     PPL: "$packageData.PPL",
          //     icon: "$packages.icon",
          //     title: "$packages.title",
          //     description: "$packages.description",
          //     precaution: "$packages.precaution",
          //   },
          // },
        },
      },
    ])
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/search/labTest/by/:city", (req, res) => {
  log.debug("/api/");
  LabCenter.aggregate([{
        $match: {
          city: req.params.city,
        },
      },
      {
        $lookup: {
          from: "labtests",
          // localField: "profileId",
          // foreignField: "_id",
          let: {
            centerId: "$_id"
          },
          as: "testData",
          pipeline: [{
            $match: {
              $expr: {
                $and: [{
                    $eq: ["$centerId", "$$centerId"]
                  },
                  {
                    $eq: ["$status", "active"]
                  },
                ],
              },
            },
          }, ],
        },
      },
      {
        $unwind: "$testData"
      },
      {
        $lookup: {
          from: "testmasters",
          // localField: "profileId",
          // foreignField: "_id",
          let: {
            testId: "$testData.testId"
          },
          as: "tests",
          pipeline: [{
            $match: {
              $expr: {
                $and: [{
                    $eq: ["$_id", "$$testId"]
                  },
                  {
                    $eq: ["$status", "active"]
                  },
                ],
              },
            },
          }, ],
        },
      },
      {
        $match: {
          "tests.title": {
            $regex: req.body.key
          },
        },
      },
      {
        $unwind: "$tests"
      },

      // {
      //   $lookup: {
      //     from: "labprofiles",
      //     // localField: "profileId",
      //     // foreignField: "_id",
      //     let: { centerId: "$_id" },
      //     as: "profileData",
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $and: [
      //               { $eq: ["$centerId", "$$centerId"] },
      //               { $eq: ["$status", "active"] },
      //             ],
      //           },
      //         },
      //       },
      //     ],
      //   },
      // },
      // { $unwind: "$profileData" },

      // {
      //   $lookup: {
      //     from: "profilemasters",
      //     // localField: "profileId",
      //     // foreignField: "_id",
      //     let: { profileId: "$profileData.profileId" },
      //     as: "profiles",
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $and: [
      //               { $eq: ["$_id", "$$profileId"] },
      //               { $eq: ["$status", "active"] },
      //             ],
      //           },
      //         },
      //       },
      //     ],
      //   },
      // },
      // { $unwind: "$profiles" },
      // {
      //   $lookup: {
      //     from: "labpackages",
      //     // localField: "profileId",
      //     // foreignField: "_id",
      //     let: { centerId: "$_id" },
      //     as: "packageData",
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $and: [
      //               { $eq: ["$centerId", "$$centerId"] },
      //               { $eq: ["$status", "active"] },
      //             ],
      //           },
      //         },
      //       },
      //     ],
      //   },
      // },
      // { $unwind: "$packageData" },
      // {
      //   $lookup: {
      //     from: "packagemasters",
      //     // localField: "profileId",
      //     // foreignField: "_id",
      //     let: { packageId: "$packageData.packageId" },
      //     as: "packages",
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $and: [
      //               { $eq: ["$_id", "$$packageId"] },
      //               { $eq: ["$status", "active"] },
      //             ],
      //           },
      //         },
      //       },
      //     ],
      //   },
      // },
      // { $unwind: "$packages" },
      {
        $group: {
          _id: "$_id",
          tests: {
            $push: {
              _id: "$testData._id",
              mrp: "$testData.mrp",
              discountOffer: "$testData.discountOffer",
              PPL: "$testData.PPL",
              icon: "$tests.icon",
              title: "$tests.title",
              duration: "$tests.duration",
              details: "$tests.details",
              precautions: "$tests.precautions",
            },
          },
          // profiles: {
          //   $push: {
          //     _id: "$profileData.profileId",
          //     mrp: "$profileData.mrp",
          //     discountOffer: "$profileData.discountOffer",
          //     PPL: "$profileData.PPL",
          //     icon: "$profiles.icon",
          //     title: "$profiles.title",
          //     description: "$profiles.description",
          //     precaution: "$profiles.precaution",
          //   },
          // },
          // packages: {
          //   $push: {
          //     _id: "$packageData.profileId",
          //     mrp: "$packageData.mrp",
          //     discountOffer: "$packageData.discountOffer",
          //     PPL: "$packageData.PPL",
          //     icon: "$packages.icon",
          //     title: "$packages.title",
          //     description: "$packages.description",
          //     precaution: "$packages.precaution",
          //   },
          // },
        },
      },
    ])
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/labTest/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getbySortByTwoPopulate(
      labsTests, {
        _id: req.params.id
      },
      "labId",
      "testId"
    )
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/labTest/:id", auth, (req, res) => {
  crudController
    .updateBy(labsTests, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/labTest/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .delete(labsTests, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/:id", (req, res) => {
  crudController
    .updateBy(IndivisualTests, req.params.id, req.body)
    .then((userData) => {
      crudController.getOne(IndivisualTests, {
        _id: req.params.id
      }).then((resData) => {
        response.successResponse(res, 200, resData);
      }).catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .delete(IndivisualTests, req.params.id)
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
    .getBy(IndivisualTests, {
      title: {
        "$regex": search,
        $options: "i",
      }
    })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/update/arr", (req, res) => {
  log.debug("/api/");
  var playlist = req.body.playlist
  crudController
    .updateBy(IndivisualTests, req.body.id, {
      $push: {
        playlists: playlist
      },
    })
    .then((resData) => {
      crudController.getOne(IndivisualTests, {
        _id: req.body.id
      }).then((data) => {
        response.successResponse(res, 200, resData);
      }).catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
router.post("/get/arr", (req, res) => {
  var obj = {
    _id: req.body.id,
    "playlists": {
      "$elemMatch": {
        "_id": req.body.playId
      }
    }
  }
  console.log("obj", obj)
  crudController
    .getBy(IndivisualTests, obj)
    .then((resData) => {
      response.successResponse(res, 200, resData)
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
module.exports = router;