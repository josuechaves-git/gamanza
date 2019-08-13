const { validationResult } = require('express-validator/check');
const Client = require('../models/client');
const Account = require('../models/account');
const Category = require('../models/category');
const Service = require('../models/service');
const mongoose = require('mongoose');

exports.createClient = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const maritalStatus = req.body.maritalStatus;
    const address = req.body.address;
    const categories = JSON.parse(JSON.stringify(req.body.categories));
    const accounts = JSON.parse(JSON.stringify(req.body.accounts));
    const services = JSON.parse(JSON.stringify(req.body.services));
    try {  
     const client = new Client({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        maritalStatus: maritalStatus,
        address: address
      });
      categories.map(i => {
        return client.categories.push(i.categoryId);
      });
      accounts.map(i => {
        return client.accounts.push(i.accountId);
      });
      services.map(i => {
        return client.services.push(i.serviceId);
      });
      //save client
      const result = await client.save();

      res.status(201).json({ message: 'Client created!', result});
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.updateClient = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const _id = req.body.id;
  const categories = JSON.parse(JSON.stringify(req.body.categories));
  const accounts = JSON.parse(JSON.stringify(req.body.accounts));
  const services = JSON.parse(JSON.stringify(req.body.services));
  try {  
    //getting the update data
    const updateCategories = categories.map(i => {
      return (i.categoryId);
    }); 
    const updateAccounts = accounts.map(i => {
      return (i.accountId);
    });
    const updateServices = services.map(i => {
       return (i.serviceId);
    });
    //updating client
    let client = await Client.findById(_id);  
    client.categories = updateCategories;
    client.accounts = updateAccounts;
    client.services = updateServices;
    
    //save client
    const result = await client.save();
    res.status(201).json({ message: 'Client updated!', result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getClients = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422; 
    error.data = errors.array();
    throw error;
  }
  try {  
  const clients = await Client.find().populate('categories').populate('services')
  .populate('accounts').exec((err, clients) => {
    res.status(201).json(clients);
  });
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}
};