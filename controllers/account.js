const { validationResult } = require('express-validator/check');
const Account = require('../models/account');

exports.createAccount = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const type = req.body.type;
    const number = req.body.number;
    try {  
      const account = new Account({
        type: type,
        number: number
      });
      const result = await account.save();
      res.status(201).json({ message: 'Account created!', accountId: result._id });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};


exports.getAccounts = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422; 
    error.data = errors.array();
    throw error;
  }
  try {  
  const accnts = await Account.find();
  res.status(201).json(accnts);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}
};