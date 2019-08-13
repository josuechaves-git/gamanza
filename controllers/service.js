const { validationResult } = require('express-validator/check');
const Service = require('../models/service');

exports.createService = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const name = req.body.name;
    const status = req.body.status;
    try {  
      const service = new Service({
        name: name,
        status : status
      });
      const result = await service.save();
      res.status(201).json({ message: 'Service created!', serviceId: result._id });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};


exports.getServices = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422; 
    error.data = errors.array();
    throw error;
  }
  try {  
  const servs = await Service.find();
  res.status(201).json(servs);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}
};