export {}
const logger = require( "./../../../boot/winston")();
const mongoose = require('mongoose');
const Joi = require('joi');

const ProfileSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    avatar: {
        type: String
    },
    dateCreated: {
        type: Date
    },
    dateUpdated: {
        type: Date
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique : true,
        required : true
    },
})

const genderEnum = {
    MALE: 0,
    FEMALE: 1,
}

let Profile = mongoose.model('Profile', ProfileSchema);

let validateSave = (profile: any)=>{
    const schema = {
        userID: Joi.string().required(),
        firstName: Joi.string().required(),
        secondName: Joi.string().required(),
        middleName: Joi.string().required(),
        dateCreated: Joi.string().required(),
        avatar: Joi.string()
    };
    return Joi.validate(profile, schema);
}

let validateUpdate = (profile: any)=>{
    const schema = {
        userID: Joi.string().required(),
        firstName: Joi.string().required(),
        secondName: Joi.string().required(),
        middleName: Joi.string().required(),
        dateUpdated: Joi.string().required(),
        avatar: Joi.string()
    };
    return Joi.validate(profile, schema);
}

let validateByUser = (profile: any)=>{
    const schema = {
        userID: Joi.string().required(),
    };
    return Joi.validate(profile, schema);
}


let isDuplicate = async (data: any) => {
    let item = await Profile.findOne({ userID: data.userID });
    return item;
}

export {
    Profile,
    validateSave,
    validateUpdate,
    validateByUser,
    isDuplicate,
    genderEnum
}
