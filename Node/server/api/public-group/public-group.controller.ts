import {PublicGroupStatusEnum} from "./public-group-status.enum";

export {}
import moment from "moment";
import {MessageGroup,
    validateMessageUpdate,
    validateMessageSave} from "../../../../Mongo/models/public-group.schema";
import { AuthController } from "../auth/auth.controller"

const bcrypt = require("bcrypt");
const logger = require( "./../../../../boot/winston")();

let get = (req: any, res: any, next: any) =>{
    logger.debug('Public Group: get');
    MessageGroup.find({
        userID: AuthController.getAuth(req).user._id
    }, (error:any, item: any)=>{
        if (error) {
            res.status(400)
                .json({
                    status: false,
                    data: item,
                    message: 'User is get have error'
                })
        }

        res.status(200)
            .json({
                status: true,
                data: item
            })
    });
}

let getList =  async (req: any, res: any, next: any) =>{
    logger.debug('getList');
    let message = await MessageGroup.find({});

    if (message) {
        res.status(200)
            .json({
                status: true,
                data: message
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
    body.dateCreated = moment().format();

    const { error } = validateMessageSave(body);
    if (error) {
        logger.error('Post Group: /post', error);
        return res.status(400)
            .json({
                status: false,
                message: error.details[0].message
            });
    }

    //body.languageID = AuthController.getAuth(req).languageID;
    //body.userID = body.userID;// AuthController.getAuth(req).user;

    let messageGroup = new MessageGroup({
        userID: body.userID,
        languageID: body.languageID,
        message: body.message,
        translate: body.translate,
        status: PublicGroupStatusEnum.DRAFT,
        dateCreated: body.dateCreated,
    })

    await messageGroup.save();

    res.json({
        status: true,
        data: messageGroup
    });

}

let update = async (req: any, res: any, next: any) =>{
    logger.debug('Profile: update');
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

//get by Public group ID
let getByID = async (req: any, res: any, next: any) =>{
    logger.debug('Public Group: getByID', req.params.id);
    let json;
    if (!req.params.id) {
        logger.error('Id was not pass!');
        return res.status(400)
            .json({
                status: false,
                message: 'Id was not pass!'
            });
    }

    let message: any = await MessageGroup.findById(req.params.id);

    if (message) {
       json = {
           status: true,
           data: message
       }
    } else {
        json ={
            status: false
        }
    }

    res.status(200)
        .json(json)
};

let remove = async (req: any, res: any, next: any) =>{
    await MessageGroup.findByIdAndRemove(req.params.id);

    res.status(200)
        .json({
            status: true
        })
}

let getPublish = (req: any, res: any, next: any) =>{
    throw new Error('Remove method not realization')
}

let copy = async (req: any, res: any, next: any) =>{
    logger.debug('Public group: copy');

    if (!req.params.id) {
        logger.error('Public group: error', 'error');
        return res.status(400)
            .json({
                status: false,
                message: 'Public group id is not define'
            });
    }

    let message: any = await MessageGroup.findOne(req.params.id);
    let newMesssage = new MessageGroup({
        "userID": message.userID,
        "message": message.message,
        "translate": message.translate,
        "status": message.status,
        "dateCreated": moment().format()
    });
    newMesssage = await newMesssage.save();

    if (newMesssage) {
        res.status(200)
            .json({
                status: true,
                data: newMesssage
            })
    }
}

export {
    get,
    getByID,
    getList,
    save,
    copy,
    update,
    remove,
    getPublish
}
