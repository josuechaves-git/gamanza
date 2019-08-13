const express = require('express');
const { body } = require('express-validator/check');
const accountController = require('../controllers/account');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/createAccount', isAuth, accountController.createAccount);
router.get('/getAccounts', isAuth, accountController.getAccounts);

module.exports = router;