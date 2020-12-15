const { schema } = require("../../models/logs");

module.exports = {
  add: (schema, data) => {
    return new Promise(function (resolve, reject) {
      var addSchema = new schema(data);
      addSchema
        .save()
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  getAll: (schema) => {
    return new Promise(function (resolve, reject) {
      schema
        .find({ status: { $ne: "deleted" } })
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  getBy: (schema, object) => {
    console.log("object", object);
    return new Promise(function (resolve, reject) {
      schema
        .find({ ...object, status: { $ne: "deleted" } })
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  getCount: (schema, object) => {
    return new Promise(function (resolve, reject) {
      schema
        .count({ ...object, status: { $ne: "deleted" } })
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  getOne: (schema, object) => {
    return new Promise(function (resolve, reject) {
      schema
        .findOne({ ...object, status: { $ne: "deleted" } })
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  updateBy: (schema, id, data) => {
    return new Promise(function (resolve, reject) {
      schema
        .findByIdAndUpdate(
          {
            _id: id,
          },
          data,
          { $new: true }
        )
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  updateWithObject: (schema, objcet, data) => {
    return new Promise(function (resolve, reject) {
      schema
        .findOneAndUpdate(objcet, data, { $new: true })
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  delete: (schema, id) => {
    return new Promise(function (resolve, reject) {
      schema
        .findByIdAndUpdate(
          {
            _id: id,
          },
          { status: "deleted" },
          { $new: true }
        )
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  deletePerm: (schema, id) => {
    return new Promise(function (resolve, reject) {
      schema
        .findByIdAndDelete({
          _id: id,
        })
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  deleteMulti: (schema, obj) => {
    return new Promise(function (resolve, reject) {
      schema
        .deleteMany(obj)
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  getWithSortBy: (schema, object, sort) => {
    return new Promise(function (resolve, reject) {
      schema
        .find({ ...object, status: { $ne: "deleted" } })
        .sort(sort)
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  getWithSortByLimit: (schema, object, sort, limit) => {
    return new Promise(function (resolve, reject) {
      schema
        .find({ ...object, status: { $ne: "deleted" } })
        .sort(sort)
        .limit(limit)
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  getWithSortByPopulate: (schema, populates) => {
    return new Promise(function (resolve, reject) {
      schema
        .find({ status: { $ne: "deleted" } })
        .populate(populates)
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  getbySortByPopulate: (schema, object, populates) => {
    return new Promise(function (resolve, reject) {
      schema
        .find({ ...object, status: { $ne: "deleted" } })
        .populate(populates)
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  getbySortByPopulateField: (schema, object, populates, field) => {
    return new Promise(function (resolve, reject) {
      schema
        .find(object)
        .populate({ path: populates, select: field })
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  getbySortByTwoPopulate: (schema, object, populate1, populate2) => {
    return new Promise(function (resolve, reject) {
      schema
        .find(object)
        .populate(populate1)
        .populate(populate2)
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

  getSingleRecordByPopulate: (schema, object, populates) => {
    console.log("object");
    return new Promise(function (resolve, reject) {
      schema
        .findOne(object)
        .populate(populates)
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },
  insertMultiple: (schema, object) => {
    return new Promise(function (resolve, reject) {
      schema
        .insertMany(object)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getMultiple: (schema, object) => {
    return new Promise(function (resolve, reject) {
      schema
        .find(object)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          log.debug("Add status error", error);
          reject(error);
        });
    });
  },
};
