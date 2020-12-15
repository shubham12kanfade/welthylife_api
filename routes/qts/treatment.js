const router = require('express').Router();
const crudController = require('../../controllers/commonController/crudController');
const response = require('../../helper/response');
const mongoose = require('mongoose');
const log = require('../../helper/logger');
const Treatment = mongoose.model('Treatment');
let auth = require('../../helper/auth');
let _ = require('lodash');


router.get('/get/all/by/:specialization', (req, res) => {
    crudController.getBy(Treatment, { specializationId: req.params.specialization, })
        .then(resData => {
            response.successResponse(res, 200, resData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.post('/get/all/by/specialization', (req, res) => {
    crudController.getMultiple(Treatment, { specializationId: { $in: req.body.specializations} })
        .then(resData => {
            response.successResponse(res, 200, resData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get('/get/all', (req, res) => {
    crudController.getWithSortByPopulate(Treatment, 'specializationId')
        .then(resData => {
            response.successResponse(res, 200, resData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get('/get/by/:id', (req, res) => {
    crudController.getBy(Treatment, { _id: req.params.id })
        .then(resData => {
            response.successResponse(res, 200, resData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.post('/get/by/specializations', (req, res) => {
    crudController.getBy(Treatment, { specializationId: { $in: req.body.specializations } })
        .then(resData => {
            response.successResponse(res, 200, resData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get('/get/all/by/doctor/:id', (req, res) => {
    crudController.getBy(Treatment, { doctorId: req.params.id })
        .then(resData => {
            response.successResponse(res, 200, resData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.post('/add', (req, res) => {
    crudController.add(Treatment, req.body)
        .then(resData => {
            response.successResponse(res, 200, resData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.put('/edit/by/:id', (req, res) => {
    crudController.updateBy(Treatment, req.params.id, req.body)
        .then(resData => {
            response.successResponse(res, 200, resData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.delete('/delete/by/:id', (req, res) => {
    crudController.delete(Treatment, req.params.id)
        .then(resData => {
            response.successResponse(res, 200, resData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

module.exports = router;