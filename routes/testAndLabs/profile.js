const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const ProfileMaster = mongoose.model("ProfileMaster");
const ProfileTests = mongoose.model("ProfileTests");
const IndivisualTests = mongoose.model("TestMaster");
const LabProfiles = mongoose.model("LabProfiles");

let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/add/master", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .add(ProfileMaster, req.body)
    .then((testData) => {
      var obj = [];
      req.body.testArray.forEach((element) => {
        obj.push({
          profileId: testData._id,
          testId: element
        });
      });
      crudController
        .insertMultiple(ProfileTests, obj)
        .then((resData) => {
          console.log("tests added for profile");
        })
        .catch((err) => {
          log.error(error);
          response.errorResponse(res, 500);
        });
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/all/master", (req, res) => {
  log.debug("/api/");
  crudController
    .getAll(ProfileMaster)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/master/by/profileId/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getOne(ProfileMaster, {
      _id: req.params.id
    })
    .then((resPkg) => {
      crudController
        .getbySortByPopulate(
          ProfileTests, {
            profileId: req.params.id
          },
          "testId"
        )
        .then((testData) => {
          var resObj = {
            profile: resPkg,
            profileTests: testData,
          };
          response.successResponse(res, 200, resObj);
        })
        .catch((error) => {
          log.error(error);
          response.errorResponse(res, 500);
        });
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/remove/tests/from/:profileId", (req, res) => {
  log.debug("/api/");
  crudController
    .deleteMulti(ProfileTests, {
      $and: [{
          profileId: req.params.profileId
        },
        {
          testId: {
            $in: req.body.testArray
          }
        },
      ],
    })
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add/tests/to/:profileId", (req, res) => {
  log.debug("/api/");
  var obj = [];
  req.body.testArray.forEach(element => {
    console.log(element)
    obj.push({
      profileId: req.params.profileId,
      testId: element
    });
  });
  crudController
    .insertMultiple(ProfileTests, obj)
    .then((resData) => {
      console.log("tests added for profile");
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

// router.get("/list/by/:patient", (req, res) => {
//   log.debug("/api/");
//   crudController
//     .getBy(ProfileMaster, { _id: req.params.id })
//     .then((userData) => {
//       response.successResponse(res, 200, userData);
//     })
//     .catch((error) => {
//       log.error(error);
//       response.errorResponse(res, 500);
//     });
// });
// router.get("/by/labId/:id", (req, res) => {
//   log.debug("/api/");
//   crudController
//     .getBy(ProfileMaster, { labId: req.params.id })
//     .then((testData) => {
//       response.successResponse(res, 200, testData);
//     })
//     .catch((error) => {
//       log.error(error);
//       response.errorResponse(res, 500);
//     });
// });
router.put("/master/by/:id", auth, (req, res) => {
  crudController
    .updateBy(ProfileMaster, req.params.id, req.body)
    .then((userData) => {
      crudController.getOne(ProfileMaster, {
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

router.delete("/master/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .delete(ProfileMaster, req.params.id)
    .then((userData) => {
      crudController
        .deleteMulti(ProfileTests, {
          profileId: req.params.id
        })
        .then((resData) => {
          console.log("delete multi++++", resData);
        })
        .catch((err) => {
          console.log(err);
        });
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

///////////////////////////////////////////////////

router.post("/add/for/lab", (req, res) => {
  log.debug("/api/");
  crudController
    .add(LabProfiles, req.body)
    .then((resPkg) => {
      response.successResponse(res, 200, resPkg);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/labId/:id", (req, res) => {
  log.debug("/api/profile/by/labid");
  crudController
    .getbySortByTwoPopulate(
      LabProfiles, {
        labId: req.params.id,
        status: "active"
      }, {
        path: "profileId",
        model: "ProfileMaster",
        // select: {
        //   _id: 1,
        //   mrp: 1,
        //   discountOffer: 1,
        //   description: 1,
        //   city: 1,
        //   PPL: 1,
        //   centerId: 1,
        // },
        // populate: {
        //   path: "profileId",
        //   model: "ProfileMaster",
        // },
      },
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
router.get("/admin/by/labTest/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getbySortByTwoPopulate(
      LabProfiles, {
        _id: req.params.id
      },
      "profileId",
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

router.get("/by/labProfile/:id", (req, res) => {
  log.debug("/api/");
  LabProfiles.aggregate([{
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
          status: "active",
        },
      },
      {
        $lookup: {
          from: "labcenters",
          let: {
            centerId: "$centerId"
          },
          as: "center",
          pipeline: [{
            $match: {
              $expr: {
                $and: [{
                    $eq: ["$_id", "$$centerId"]
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
        $unwind: "$center"
      },
      {
        $lookup: {
          from: "labs",
          let: {
            labId: "$labId"
          },
          as: "lab",
          pipeline: [{
            $match: {
              $expr: {
                $and: [{
                    $eq: ["$_id", "$$labId"]
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
        $unwind: "$lab"
      },
      {
        $lookup: {
          from: "profilemasters",
          let: {
            profileId: "$profileId"
          },
          as: "profile",
          pipeline: [{
            $match: {
              $expr: {
                $and: [{
                    $eq: ["$_id", "$$profileId"]
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
        $unwind: "$profile"
      },
      {
        $lookup: {
          from: "profiletests",
          let: {
            profileId: "$profile._id"
          },
          as: "testData",
          pipeline: [{
            $match: {
              $expr: {
                $and: [{
                    $eq: ["$profileId", "$$profileId"]
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
      {
        $group: {
          _id: "$_id",
          mrp: {
            $first: "$mrp"
          },
          discountOffer: {
            $first: "$discountOffer"
          },
          PPL: {
            $first: "$PPL"
          },
          icon: {
            $first: "$profile.icon"
          },
          title: {
            $first: "$profile.title"
          },
          description: {
            $first: "$profile.description"
          },
          precaution: {
            $first: "$profile.precaution"
          },
          lab: {
            $first: {
              _id: "$labId",
              icon: "$lab.icon",
              name: "$lab.name",
              email: "$lab.email",
              doc1: "$lab.doc1",
              mobileNumber: "$lab.mobileNumber",
              altMobileNumber: "$lab.altMobileNumber",
              type: "$lab.type",
              regCertNo: "$lab.regCertNo",
              about: "$lab.about",
            },
          },
          center: {
            $first: {
              _id: "$centerId",
              icon: "$center.icon",
              name: "$center.name",
              email: "$center.email",
              fax: "$center.fax",
              mobileNumber: "$center.mobileNumber",
              type: "$center.type",
              details: "$center.details",
              address: "$center.address",
              landmark: "$center.landmark",
              state: "$center.state",
              city: "$center.city",
              pincode: "$center.pincode",
              country: "$center.country",
            },
          },
          tests: {
            $push: {
              _id: "$testData.testId",
              CTA: "$tests.CTA",
              icon: "$tests.icon",
              title: "$tests.title",
              duration: "$tests.duration",
              details: "$tests.details",
              precautions: "$tests.precautions",
            },
          },
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

router.delete("/labProfile/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .delete(LabProfiles, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/labProfile/by/:id", auth, (req, res) => {
  crudController
    .updateBy(LabProfiles, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;