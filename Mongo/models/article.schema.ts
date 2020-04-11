export {}
const mongoose = require('mongoose');
const Joi = require('joi');

const articleSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    translateUA: {
        type: String
    },
    translateEN: {
        type: String
    },
    translateRU: {
        type: String
    },
    dateCreated: {
        type: Date
    },
    dateUpdated: {
        type: Date
    },
    userID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

let Article = mongoose.model('Article', articleSchema);

let validateArticleSave = (article: any)=>{
    const schema = {
        key: Joi.string().required(),
        userID: Joi.string().required(),
        translateUA: Joi.string().required(),
        translateEN: Joi.string().required(),
        translateRU: Joi.string().required(),
        dateCreated: Joi.string()
    };
    return Joi.validate(article, schema);
}

let isDuplicate = async (article: any)=>{
    return await Article.find({
        key: article.key
    });
}

let findByKey = async (key: any)=>{
    return Article.find({
        key: key
    });
}

export {
    Article,
    validateArticleSave,
    isDuplicate,
    findByKey
}