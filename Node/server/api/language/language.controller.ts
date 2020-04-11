import {MessageGroup, validateMessageUpdate} from "./models/public-group.schema";

export {}
import moment from "moment";
import {LanguageStatusEnum} from "../Node/server/api/language/language-status.enum";
const { Language,
        validateLanguageSave,
        isDuplicate
} = require("./models/language.schema");
const bcrypt = require("bcrypt");
const logger = require( "./../../../../boot/winston")();

let get = (req: any, res: any, next: any) =>{
    logger.debug('Language: get');

    let json;
    let language = Language.find();

    if (language) {
        json = {
            status: true,
            data: language
        }
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
    let language = await Language.find();

    if (language) {
        res.status(200)
            .json({
                status: true,
                data: language
            })
    } else {
        res.status(200)
            .json({
                status: false
            })
    }
}

let save = async (req: any, res: any, next: any) =>{
    let body = req.body;

    let { error } = validateLanguageSave(body);

    if (error) {
        return res.status(400)
            .json({
                status: false,
                message: error.details[0].message
            });
    }

    let language: any = await isDuplicate(body)

    if (language) {
        res.status(400)
            .json({
                status: false,
                message: 'Is dublicate!'
            });
        return;
    }

    body.dateCreated = moment().format();
    language = new Language({
        value: body.value,
        status: Number(LanguageStatusEnum.DRAFT),
        dateCreated: body.dateCreated
    })

    language.save();
    res.json({
        status: true,
        data: language
    });

}

//get by Language ID
let getByID = async (req: any, res: any, next: any) =>{
    logger.debug('Language: getByID', req.params.id);

    if (!req.params.id) {
        logger.error('Id was not pass!');
        return res.status(400)
            .json({
                status: false,
                message: 'Id was not pass!'
            });
    }

    let language: any = await Language.findById(req.params.id);

    if (language) {
        res.status(200)
            .json({
                status: true,
                data: language
            })
    }
};

let changeStatus = (req: any, res: any, next: any) =>{
    throw new Error('changeStatus method not realization')
}

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
    await Language.findByIdAndRemove(req.params.id);

    res.status(200)
        .json({
            status: true
        })
}

let copy = async (req: any, res: any, next: any) =>{
    logger.debug('Language: copy');

    if (!req.params.id) {
        logger.error('Language: error', 'Language id is not define');
        return res.status(400)
            .json({
                status: false,
                message: 'Language id is not define'
            });
    }

    let language: any = await Language.findOne(req.params.id);

    language = new Language({
        "value": language.value,
        "status": Number(LanguageStatusEnum.DRAFT),
        "dateCreated": moment().format()
    });
    language = await language.save();

    if (language) {
        res.status(200)
            .json({
                status: true,
                data: language
            })
    }
}

let getPublish = async (req: any, res: any, next: any) =>{
    let language = await Language.find({});
    let json;

    if (language) {
        json = language
    } else {
        json = {}
    }

    res.status(200)
        .json(json)
}

export {
    get,
    getByID,
    getList,
    getPublish,
    save,
    update,
    changeStatus,
    remove,
    copy
}
