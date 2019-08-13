const { validationResult } = require('express-validator/check');
const Category = require('../models/category');

exports.createCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const name = req.body.name;
    try {  
      const category = new Category({
        name: name
      });
      const result = await category.save();
      res.status(201).json({ message: 'Category created!', categoryId: result._id });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.getCategories = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422; 
    error.data = errors.array();
    throw error;
  }
  try {  
  const cats = await Category.find();
  res.status(201).json(cats);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}
};