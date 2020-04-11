export {}
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    login: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        select: false
    },
    dateCreate: {
        type: Date,
        required: true
    },
    dateUpdate: {
        type: Date
    },
    status: {
        type: String
    },
    validationID: {
        type: Number
    }
})
const globalAny: any = global;

//custom method to generate authToken
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, globalAny.gConfig.privateKey); //get the private key from the config file -> environment variable
    return token;
}

userSchema.methods.checkDublicate = async function (json: any) {
    return await userSchema.findOne(json)
}

const User = mongoose.model('User', userSchema);

//function to validate user return promise
function validateUserSingIn(user: any) {
    const schema = {
        login: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(255).required()
    };
    return Joi.validate(user, schema);
}

function validateUserAdd(user: any) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        login: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(255).required(),
    };
    return Joi.validate(user, schema);
}

export {
    validateUserSingIn,
    validateUserAdd,
    User
}
