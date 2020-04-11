export {}
const mongoose = require('mongoose');
const Joi = require('joi');

const languageSchema = mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    status: {
        type: Number
    },
    dateCreated: {
        type: Date
    },
    dateUpdated: {
        type: Date
    },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'publicGroup' }]
})

const languageStatusEnum = {
    DRAFT: 1,
    ENABLED: 0,
}

/*
* # status:
# 1 - draft
# 0 - enable

# Example:
# 1 EN 0
# 2 UA 0
# 3 RU 1
* */

let Language = mongoose.model('Language', languageSchema);

let validateLanguageSave = (language: any)=>{
    const schema = {
        value: Joi.string().required(),
        status: Joi.string().required()
    };
    return Joi.validate(language, schema);
}

let isDuplicate = async (language: any, callback: any)=>{
    return Language.find({
        value: language.value
    });
}

export {
    Language,
    validateLanguageSave,
    isDuplicate,
    languageStatusEnum
}