const express = require('express');
const { body } = require('express-validator/check');
const clientController = require('../controllers/client');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/createClient', isAuth, clientController.createClient);
router.put('/updateClient',  isAuth, clientController.updateClient);
router.get('/getClients',  isAuth, clientController.getClients);

module.exports = router;