const { validationResult } = require('express-validator/check');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  try {
   
  const email = req.body.email;
  const password = req.body.password;
  
  const hashedPw = await bcrypt.hash(password, 12);
  console.log(hashedPw);
  const user = new User({
    email: email,
    password: hashedPw,
  });
  const result = await user.save();
  res.status(201).json({ message: 'User created!', result });
} catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try{
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error('A user with this email could not be found.');
    error.statusCode = 401;
    throw error;
  }
   if(!bcrypt.compare(password, user.password)){
    const error = new Error('Wrong password!');
    error.statusCode = 401;
    throw error;
   }
   loadedUser = user;
   const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'tokenGamanza1234',
        { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    }catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
};


exports.getUsers = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422; 
    error.data = errors.array();
    throw error;
  }
  try {  
  const usrs = await User.find();
  res.status(201).json(usrs);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}
};