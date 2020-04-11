export {}
const mongoose = require('mongoose');

const validationSchema = mongoose.Schema({
    validationID: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    dateCreated: {
        type: Date
    },
    dateUpdated: {
        type: Date
    },
})

/*
validationID PK int IDENTITY
email string
phone string
* */

module.exports = mongoose.model('Validation', validationSchema);
