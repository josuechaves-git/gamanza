/*
▪ Nombre de cliente-
▪ Id
▪ estado civil-
▪ dirección-
▪ email-
▪ # telefónico-
▪ Cuentas de cliente (categorizar por tipo)
▪ Servicios
▪ Categorización de cliente

*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }],
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema);
