const express = require('express');
const { body } = require('express-validator/check');
const serviceController = require('../controllers/service');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/createService', isAuth, serviceController.createService);
router.get('/getServices', isAuth, serviceController.getServices);

module.exports = router;