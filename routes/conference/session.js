const router = require('express').Router();
const crudController = require('../../controllers/commonController/crudController');
const log = require('../../helper/logger');
const response = require('../../helper/response');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const conferenceController = require('../../controllers/conference/conference');
const conferenceSession = mongoose.model('conferenceSession');
const config = require('../../config.json');

let auth = require('../../helper/auth');
var OpenTok = require('opentok'),
    opentok = new OpenTok(config.OT.apiKey, config.OT.apiSecret);

router.post('/', auth, (req, res) => {
    log.debug('/api/');
    opentok.createSession(function(err, session) {
        if (err) return console.log(err);
        req.body["sessionId"] = session.sessionId;
        req.body["patient"] = req.userId;
        var token = opentok.generateToken(session.sessionId);
        req.body["token"] = token;
        crudController.add(conferenceSession, req.body)
            .then(userData => {
                response.successResponse(res, 200, userData);
            })
            .catch(error => {
                log.error(error);
                response.errorResponse(res, 500);
            });
    });
});

router.post('/end/session', auth, (req, res) => {
    log.debug('/api/end/session');

    // var object = {};
    //         if (user.hasOwnProperty("patient")) {

    //         } else {
    //             object["doctor"] = data.doctor;
    //         }

    conferenceController.deleteSession(req.body.patient)
        .then(userData => {
            response.successResponse(res, 200, "Session disconnected");
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get('/patient', auth, (req, res) => {
    log.debug('/api/patient');
    console.log("req.userId", req.userId)
    crudController.getOne(conferenceSession, { patient: req.userId, status: { $ne: 'deleted' } })
        .then(userData => {
            if (userData) {
                response.successResponse(res, 200, { sessionId: userData.sessionId, token: userData.token });
            } else {
                response.successResponse(res, 201, 'No Session connected');
            }
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.get('/doctor', auth, (req, res) => {
    log.debug('/api/doctor', req.userId);
    crudController.getOne(conferenceSession, { doctor: req.userId, status: { $ne: 'deleted' } })
        .then(userData => {
            if (userData) {
                response.successResponse(res, 200, { sessionId: userData.sessionId, token: userData.token });
            } else {
                response.successResponse(res, 201, 'No Session connected');
            }
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.put('/:id', auth, (req, res) => {
    log.debug('/api/:id');
    crudController.updateBy(conferenceSession, req.params.id, req.body)
        .then(userData => {
            response.successResponse(res, 200, userData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

router.delete('/:id', auth, (req, res) => {
    log.debug('/api/');
    crudController.delete(conferenceSession, req.params.id)
        .then(userData => {
            response.successResponse(res, 200, userData);
        })
        .catch(error => {
            log.error(error);
            response.errorResponse(res, 500);
        });
});

module.exports = router;