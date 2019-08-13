const path = require('path');

//requires npm packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes definitions
const categoriesRoutes = require('./routes/categories');
const accountsRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');
const clientsRoutes = require('./routes/clients');
const usersRoutes = require('./routes/users');

//init configuration
const app = express();
//allow json request
app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//routes definition
app.use('/category', categoriesRoutes);
app.use('/account', accountsRoutes);
app.use('/service', servicesRoutes);
app.use('/client', clientsRoutes);
app.use('/user', usersRoutes);

//mongoose connection
mongoose
  .connect(
    'mongodb+srv://josue:6ZTH0HXSo7kTTB3j@cluster0-7xso1.mongodb.net/test?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
