const express = require('express');
const { body } = require('express-validator/check');
const categoryController = require('../controllers/category');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/createCategory', isAuth,  categoryController.createCategory);
router.get('/getCategories', isAuth,  categoryController.getCategories);

module.exports = router;