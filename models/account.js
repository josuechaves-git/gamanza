const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema(
    {
    type: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Account', accountSchema);
