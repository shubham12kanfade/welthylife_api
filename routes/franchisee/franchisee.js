const router = require('express').Router();
const crudController = require('../../controllers/commonController/crudController');
const doctorController = require('../../controllers/doctor/doctor');
const log = require('../../helper/logger');
const response = require('../../helper/response');
const mongoose = require('mongoose');
const User = mongoose.model('User');
let auth = require('../../helper/auth');
let _ = require('lodash');

router.post('/', auth, (req, res) => {
    log.debug('/api/');
    crudController.add(User, req.body)
        .then(userData => {
            response.successResponse(res, 200, userData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get('/', (req, res) => {
    log.debug('/api/');
    crudController.getWithSortBy(User, { designation: 'Franchisee' }, { isOnline: 1 })
        .then(userData => {
            response.successResponse(res, 200, userData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});


router.get('/:id', (req, res) => {
    log.debug('/api/');
    crudController.getOne(User, { _id: req.params.id, designation: 'Franchisee' })
        .then(userData => {
            response.successResponse(res, 200, userData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.put('/:id', auth, (req, res) => {
    log.debug('/api/:id');
    var franchisee = _.pick(req.body, ['franchiseeName', 'location', 'language', 'extraPhoneNumber', 'bloodGroup', 'avatar', 'gender', 'dob', 'title', 'specialitie', 'isOnline', 'isVerified']);
    crudController.updateBy(User, req.params.id, franchisee)
        .then(userData => {
            delete userData.otp;
            delete userData.password;
            response.successResponse(res, 200, userData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.delete('/:id', auth, (req, res) => {
    log.debug('/api/');
    crudController.delete(User, req.params.id)
        .then(userData => {
            response.successResponse(res, 200, userData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get('/profile/percentage', auth, (req, res) => {
    log.debug('/api/');
    crudController.getOne(User, { _id: req.userId, designation: 'Doctor' })
        .then(userData => {
            var totalPer = 16;
            var total = 16;
            if (!userData.avatar || userData.avatar === '') {
                totalPer -= 1;
            }
            if (!userData.gender || userData.gender === '') {
                totalPer -= 1;
            }
            if (!userData.dob || userData.dob === '') {
                totalPer -= 1;
            }
            if (!userData.email || userData.email === '') {
                totalPer -= 1;
            }
            if (!userData.mobileNumber || userData.mobileNumber === '') {
                totalPer -= 1;
            }
            if (!userData.isEmailVerified || userData.isEmailVerified === 'Not') {
                totalPer -= 1;
            }
            if (!userData.lastName || userData.lastName === '') {
                totalPer -= 1;
            }
            if (!userData.firstName || userData.firstName === '') {
                totalPer -= 1;
            }
            if (!userData.isMobileVerified || userData.isMobileVerified == 'Not') {
                totalPer -= 1
            }
            if (!userData.extraPhoneNumber || userData.extraPhoneNumber == '') {
                totalPer -= 1
            }
            if (!userData.language || userData.language == '') {
                totalPer -= 1
            }
            if (!userData.location.address || userData.location.address == '') {
                totalPer -= 1
            }
            if (!userData.location.landmark || userData.location.landmark == '') {
                totalPer -= 1
            }
            if (!userData.location.state || userData.location.state == '') {
                totalPer -= 1
            }
            if (!userData.location.city || userData.location.city == '') {
                totalPer -= 1
            }
            if (!userData.location.pincode || userData.location.pincode == '') {
                totalPer -= 1
            }
            response.successResponse(res, 200, { completed: Math.round((totalPer * 100) / total) });
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

module.exports = router;