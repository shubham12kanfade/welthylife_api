const mongoode = require('mongoose');
var Logs = mongoode.model('Logs');
const geolib = require('geolib');

module.exports = {
    add: (data) => {
        return new Promise(function(resolve, reject) {
            var log = new Logs(data);
            log.save().then((resData) => {
                console.log("Logs added to database");
            }).catch(err => {
                console.log("Logs error");
            })
        });
    },

    getAll: () => {
        return new Promise(function(resolve, reject) {
            Logs.find().then(resData => {
                resolve(resData);
            }).catch(error => {
                console.log("error", error)
                reject(error);
            })
        });
    },

}