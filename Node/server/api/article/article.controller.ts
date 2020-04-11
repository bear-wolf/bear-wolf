import {MessageGroup, validateMessageUpdate} from "../../../../Mongo/models/public-group.schema";

export {}
import moment from "moment";

import { Article,
        validateArticleSave,
        isDuplicate,
        findByKey
        } from "../../../../Mongo/models/article.schema";

const logger = require( "./../../../../boot/winston")();

let get = (req: any, res: any, next: any) =>{
    logger.debug('Language: get');

    let json;
    let article = Article.find();

    if (article) {
        json = article
    } else {
        json = {
            status: false
        }
    }

    res.status(200)
        .json(json);
}

let getList =  async (req: any, res: any, next: any) =>{
    logger.debug('getList');
    let article = await Article.find();

    if (article) {
        res.status(200)
            .json(article)
    } else {
        res.status(400)
            .json({
                status: false
            })
    }
}

let save = async (req: any, res: any, next: any) =>{
    logger.debug('Article: save');
    let body = req.body;

    let { error } = validateArticleSave(body);

    if (error) {
        return res.status(400)
            .json({
                message: error.details[0].message
            });
    }

    let article = await isDuplicate(body);

    if (article && article.length) {
        res.status(400)
            .json({
                message: 'Is duplicate!'
            });
        return;
    }

    body.dateCreated = moment().format();
    article = new Article({
        key: body.key,
        userID: body.userID,
        translateUA: body.translateUA,
        translateEN: body.translateEN,
        translateRU: body.translateRU,
        dateCreated: body.dateCreated
    })

    article.save();
    res.json(article);
}

//get by Language ID
let getByID = async (req: any, res: any, next: any) =>{
    logger.debug('Article: getByID', req.params.id);

    if (!req.params.id) {
        logger.error('Id was not pass!');
        return res.status(400)
            .json({
                message: 'Id was not pass!'
            });
    }

    let article: any = await Article.findById(req.params.id);

    if (article) {
        res.status(200)
            .json(article)
    }
};

//get by Key
let getByKey = async (req: any, res: any, next: any) =>{
    logger.debug('Article: getByKey', req.params.id);

    if (!req.params.id) {
        logger.error('Key was not pass!');
        return res.status(400)
            .json({
                message: 'Key was not pass!'
            });
    }

    let article: any = await findByKey(req.params.id);

    if (article) {
        res.status(200)
            .json(article)
    } else {
        res.status(400)
            .json()
    }
};

let update = async (req: any, res: any, next: any) =>{
    logger.debug('Language: update');
    let body = req.body;

    body.dateUpdated = moment().format();

    const { error } = validateMessageUpdate(body);
    if (error) {
        logger.error('Profile: update', error);
        return res.status(400)
            .json({
                status: false,
                message: error.details[0].message
            });
    }

    let profile: any = await MessageGroup.findByIdAndUpdate( req.params.id, {
        $set: body
    });

    if (profile) {
        res.status(200)
            .json({
                status: true
            })
    }
}

let remove = async (req: any, res: any, next: any) =>{
    await Article.findByIdAndRemove(req.params.id);

    res.status(200)
        .json({
            status: true
        })
}


export {
    getByKey,
    getByID,
    getList,
    save,
    update,
    remove,
}
