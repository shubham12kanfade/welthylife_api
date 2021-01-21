const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Slots = mongoose.model("Slots");
const Product = mongoose.model("Product");
const DoctorsQualification = mongoose.model("DoctorsQualification");
const UsersAccounts = mongoose.model("UsersAccounts");
const DoctorsSpecialization = mongoose.model("DoctorsSpecialization");
const DoctorsAwards = mongoose.model("DoctorsAwards");
const DoctorsTreatments = mongoose.model("DoctorsTreatments");
const DoctorsSymptoms = mongoose.model("DoctorsSymptoms");

const logController = require("../../controllers/logs");

let auth = require("../../helper/auth");
let _ = require("lodash");

let fields = [
  "firsName",
  "lastName",
  "registrationNumber",
  "registrationCouncil",
  "registrationYear",
  "lastName",
  "location",
  "bloodGroup",
  "language",
  "timeZone",
  "extraPhoneNumber",
  "bloodGroup",
  "avatar",
  "gender",
  "dob",
  "title",
  "specialitie",
  "isOnline",
  "isVerified",
  "degree",
  "experience",
  "college",
  "yearOfCompletion",
  "typeOfEstablishment",
  "identityFile",
  "registrationProff",
  "establishmentProff",
  "establishmentHour",
  "fees",
];

router.get("/profile/details", auth, (req, res) => {
  log.debug("/api/profile/details====================>", req.userId);
  crudController
    .getOne(User, {
      _id: req.userId
    })
    .then((userData) => {
      var log = {
        userId: req.userId,
        doctorId: userData._id,
        logMessage: "prtient clicked on doctor's profile details",
        logObject: req.body,
      };
      logController.add(log);
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/profile/details", (req, res) => {
  log.debug("/api/profile/details", req.findId);
  crudController
    .getOne(User, {
      _id: req.body.findId
    })
    .then((userData) => {
      var log = {
        userId: req.userId,
        doctorId: req.body.findId,
        logMessage: "prtient clicked on doctor's profile details",
        logObject: req.body,
      };
      logController.add(log);
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
    .getWithSortBy(User, {
      designation: "Doctor"
    }, {
      isOnline: 1
    })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/averageStars/by/:id", (req, res) => {
  log.debug("/api/");
  doctorController
    .avgStars(req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/list/for/consultation", (req, res) => {
  log.debug("/api/");
  doctorController
    .getBy()
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
      User, {
        doctorType: req.params.type,
        designation: "Doctor"
      }, {
        isOnline: 1
      }
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
      }, {
        updatedAt: 1
      }
    )
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/all/counts", (req, res) => {
  log.debug("/api/");
  crudController
    .getCount(User, {
      isOnline: true,
      designation: "Doctor",
      isMobileVerified: "Verified",
      isEmailVerified: "Verified",
      isVerified: "Yes",
    })
    .then((userData) => {
      crudController
        .getCount(Product, {
          isApprove: "Approved",
          status: "active",
        })
        .then((medData) => {
          crudController
            .getCount(User, {
              isOnline: true,
              designation: "User",
              isMobileVerified: "Verified",
              isEmailVerified: "Verified",
            })
            .then((petientData) => {
              crudController
                .getCount(User, {
                  isOnline: true,
                  designation: "Doctor",
                  isMobileVerified: "Verified",
                  isEmailVerified: "Verified",
                  isVerified: "Yes",
                })
                .then((doctorData) => {
                  var obj = {
                    onlineDoctors: userData,
                    medicineCount: medData,
                    petientsCount: petientData,
                    totalDoctors: doctorData,
                  };
                  response.successResponse(res, 200, obj);
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
    .getOne(User, {
      _id: req.params.id
    })
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
  console.log("doctorData+++++++++", doctorData);
  crudController
    .updateBy(User, req.userId, doctorData)
    .then((userData) => {
      console.log("userData==========", userData);
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

router.get("/profile/validity/by/:id", (req, res) => {
  log.debug("/api/");
  doctorController
    .checkValidity(req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/profile/percentage", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getOne(User, {
      _id: req.userId,
      designation: "Doctor"
    })
    .then((userData) => {
      var totalPer = 16;
      var total = 16;
      if (!userData.avatar || userData.avatar === "") {
        totalPer -= 1;
      }
      if (!userData.gender || userData.gender === "") {
        totalPer -= 1;
      }
      if (!userData.dob || userData.dob === "") {
        totalPer -= 1;
      }
      if (!userData.email || userData.email === "") {
        totalPer -= 1;
      }
      if (!userData.mobileNumber || userData.mobileNumber === "") {
        totalPer -= 1;
      }
      if (!userData.isEmailVerified || userData.isEmailVerified === "Not") {
        totalPer -= 1;
      }
      if (!userData.lastName || userData.lastName === "") {
        totalPer -= 1;
      }
      if (!userData.firstName || userData.firstName === "") {
        totalPer -= 1;
      }
      if (!userData.isMobileVerified || userData.isMobileVerified == "Not") {
        totalPer -= 1;
      }
      if (!userData.extraPhoneNumber || userData.extraPhoneNumber == "") {
        totalPer -= 1;
      }
      if (!userData.language || userData.language == "") {
        totalPer -= 1;
      }
      if (!userData.location.address || userData.location.address == "") {
        totalPer -= 1;
      }
      if (!userData.location.landmark || userData.location.landmark == "") {
        totalPer -= 1;
      }
      if (!userData.location.state || userData.location.state == "") {
        totalPer -= 1;
      }
      if (!userData.location.city || userData.location.city == "") {
        totalPer -= 1;
      }
      if (!userData.location.pincode || userData.location.pincode == "") {
        totalPer -= 1;
      }
      response.successResponse(res, 200, {
        completed: Math.round((totalPer * 100) / total),
      });
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/admin/add/q/s/a/reg", auth, (req, res) => {
  var awardObj = [];
  var qualifyArray = []
  var specialArray = [];
  var treatArray = [];
  var sympArray = [];

  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }

  Array.from(req.body.awardArray).forEach((ele) => {
    awardObj.push({
      userId: userId,
      awardId: ele.awardId,
      year: ele.year,
    });
  });
  Array.from(req.body.symptomArray).forEach((ele) => {
    sympArray.push({
      doctorId: userId,
      symptomId: ele,
    });
  });
  Array.from(req.body.treatmentArray).forEach((ele) => {
    treatArray.push({
      doctorId: userId,
      treatmentId: ele,
    });
  });
  Array.from(req.body.qualificationArray).forEach((ele) => {
    qualifyArray.push({
      doctorId: userId,
      qualificationId: ele.qualificationId,
      degree: ele.degree,
      completionYear: ele.completionYear,
      college: ele.college,
    });
  });
  Array.from(req.body.specializationArray).forEach((ele) => {
    specialArray.push({
      doctorId: userId,
      specializationId: ele,
    });
  });
  crudController
    .insertMultiple(DoctorsAwards, awardObj)
    .then((awardRes) => {
      crudController
        .insertMultiple(DoctorsQualification, qualifyArray)
        .then((qulRes) => {
          crudController
            .insertMultiple(DoctorsSpecialization, specialArray)
            .then((splRes) => {
              crudController
                .insertMultiple(DoctorsTreatments, treatArray)
                .then((treRes) => {
                  crudController
                    .insertMultiple(DoctorsSymptoms, sympArray)
                    .then((symRes) => {
                      crudController.updateBy(User, userId, {
                        registrationNumber: req.body.registrationNumber,
                        registrationCouncil: req.body.registrationCouncil,
                        registrationYear: req.body.registrationYear,
                      }).then(userRes => {
                        response.successResponse(res, 200, {
                          userRes,
                          splRes,
                          qulRes,
                          awardRes,
                          treRes,
                          symRes
                        });
                      }).catch((error) => {
                        log.error(error.code);
                        response.errorResponse(res, parseInt(error.code));
                      });
                    })
                    .catch((error) => {
                      log.error(error.code);
                      response.errorResponse(res, parseInt(error.code));
                    });
                })
                .catch((error) => {
                  log.error(error.code);
                  response.errorResponse(res, parseInt(error.code));
                });
            })
            .catch((error) => {
              log.error(error.code);
              response.errorResponse(res, parseInt(error.code));
            });
        })
        .catch((error) => {
          log.error(error.code);
          response.errorResponse(res, parseInt(error.code));
        });
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, parseInt(error.code));
    });
});

router.post("/admin/add/slots/acc", auth, (req, res) => {
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  req.body["userId"] = userId
  crudController.add(Slots , req.body).then((data)=>{
    response.successResponse(res , 200 , data)
  }).catch((error)=>{
    log.error(error.code)
    response.errorResponse(res, parseInt(error.code));
  })
  // req.body.slotsArray.forEach(element => {
  //   element["userId"] = userId;
  // });
  // crudController
  //   .insertMultiple(Slots, req.body.slotsArray)
  //   .then((slotData) => {
  //     crudController.add(UsersAccounts, {
  //       "userId": userId,
  //       "bankName": req.body.bankName,
  //       "AccNo": req.body.AccNo,
  //       "ifscCode": req.body.ifscCode,
  //       "panNo": req.body.panNo,
  //     }).then(accRes => {
  //       crudController.updateBy(User, userId, {
  //         "fees": req.body.fees,
  //         "establishmentHour": req.body.establishmentHour,
  //         "clinicId":req.body.clinicId,
  //         "locationId":req.body.locationId,
  //         "hours": req.body.hour,
  //       }).then(userRes => {
  //         response.successResponse(res, 200, {
  //           userRes,
  //           accRes,
  //           slotData
  //         });
  //       }).catch((error) => {
  //         log.error(error);
  //         response.errorResponse(res, 500);
  //       });
  //     }).catch((error) => {
  //       log.error(error);
  //       response.errorResponse(res, 500);
  //     });
  //   })
  //   .catch((error) => {
  //     log.error(error);
  //     response.errorResponse(res, 500);
  //   });
});

router.post("/get/admin/add/q/s/a/reg", auth, (req, res) => {

  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }

  crudController
    .getBy(DoctorsAwards, {
      userId: userId
    })
    .then((awardRes) => {
      crudController
        .getBy(DoctorsQualification, {
          doctorId: userId
        })
        .then((qulRes) => {
          crudController
            .getBy(DoctorsSpecialization, {
              doctorId: userId
            })
            .then((splRes) => {
              crudController
                .getBy(DoctorsTreatments, {
                  doctorId: userId
                })
                .then((treRes) => {
                  crudController
                    .getBy(DoctorsSymptoms, {
                      doctorId: userId
                    })
                    .then((symRes) => {
                      crudController.getBy(User, {
                        _id: userId
                      }).then(userRes => {
                        response.successResponse(res, 200, {
                          userRes,
                          splRes,
                          qulRes,
                          awardRes,
                          treRes,
                          symRes
                        });
                      }).catch((error) => {
                        log.error(error.code);
                        response.errorResponse(res, parseInt(error.code));
                      });
                    })
                    .catch((error) => {
                      log.error(error.code);
                      response.errorResponse(res, parseInt(error.code));
                    });
                })
                .catch((error) => {
                  log.error(error.code);
                  response.errorResponse(res, parseInt(error.code));
                });
            })
            .catch((error) => {
              log.error(error.code);
              response.errorResponse(res, parseInt(error.code));
            });
        })
        .catch((error) => {
          log.error(error.code);
          response.errorResponse(res, parseInt(error.code));
        });
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, parseInt(error.code));
    });
});

router.post("/get/admin/add/slots/acc", auth, (req, res) => {
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  crudController
    .getBy(Slots, {
      userId: userId
    })
    .then((slotData) => {
      crudController.getBy(UsersAccounts, {
        userId: userId
      }).then(accRes => {
        crudController.getBy(User, userId, {
          userId: userId
        }).then(userRes => {
          response.successResponse(res, 200, {
            userRes,
            accRes,
            slotData
          });
        }).catch((error) => {
          log.error(error);
          response.errorResponse(res, 500);
        });
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

module.exports = router;