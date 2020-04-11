export {}
const mongoose = require('mongoose');
const Joi = require('joi');

const publicGroupSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // languageID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Language',
    //     required: true
    // },
    message: {
        type: String
    },
    translate: {
        type: String
    },
    status: {
        type: Number
    },
    dateCreated: {
        type: Date
    },
    dateUpdated: {
        type: Date
    }
})

/*
* publicGroupID PK int IDENTITY
    userID int FK >- User.userID
    languageID int FK >- Language.languageID # id key
    message string  #original post EN
    translate string # translate
    status int  # status of post
    dateCreated date
    dateUpdated date
    *
* */

const PublicGroupSchema = mongoose.model('PublicGroup', publicGroupSchema);

let validateMessageSave = (data: any)=>{
    const schema = {
        userID: Joi.string().required(),
        languageID: Joi.string().required(),
        message: Joi.string().required(),
        translate: Joi.string().required(),
        status: Joi.number().required(),
        dateCreated: Joi.string().required(),
    };
    return Joi.validate(data, schema);
}

let validateMessageUpdate = (data: any)=>{
    const schema = {
        message: Joi.string().required(),
        translate: Joi.string().required(),
        dateUpdated: Joi.string().required(),
    };
    return Joi.validate(data, schema);
}

let MessageGroup = PublicGroupSchema;

export {
    validateMessageSave,
    validateMessageUpdate,
    MessageGroup,
}