export {}
import {
    isDuplicate,
    Profile,
    validateByUser,
    validateSave,
    validateUpdate
} from "../../../../Mongo/models/profile.schema";

import moment from "moment";
const logger = require( "./../../../../boot/winston")();

let save = async (req: any, res: any, next: any) =>{
    let body = req.body;
    body.dateCreated = moment().format();
    logger.debug('Profile: save');

    const { error } = validateSave(body);
    if (error) {
        logger.error('Profile: save', error);
        return res.status(400)
            .json({
                status: false,
                message: error.details[0].message
            });
    }

    let item: any = await isDuplicate(body);
    if (item && item._id) {
        logger.error('Profile is exist!', error);
        res.json({
            status: false,
            message: 'Profile is exist!'
        });
        return;
    }

    let profile = new Profile(body);
    await profile.save();
    logger.debug('Profile: saved', profile._id);

    res.json({
        status: true,
        data: profile
    });
    return;
}

//get by Profile ID
let getByID = async (req: any, res: any, next: any) =>{
    logger.debug('Profile: getByUserID');
    let id = req.params.id;

    if (req.params.id) {
        logger.error('Profile does not exist!');
        return res.status(400)
            .json({
                status: false,
                message: 'Profile does not exist!'
            });
    }

    let profile: any = await Profile.find({
        _id: id
    });

    if (profile) {
        res.status(200)
            .json({
                status: true,
                data: profile
            })
    }
};

let getByUserID = async (req: any, res: any, next: any) =>{
    logger.debug('Profile: getByUserID');
    let id = req.params.id;

    const { error } = validateByUser({userID: id});
    if (error) {
        logger.error('Profile: getByUserID', error);
        return res.status(400)
            .json({
                status: false,
                message: error.details[0].message
            });
    }

    let profile: any = await Profile.findOne({
        userID: id //AuthController.getAuth(req).user._id
    });

    if (profile) {
        res.status(200)
            .json({
                status: true,
                data: profile
        })
    }
}

let removeAvatar = async (req: any, res: any, next: any) =>{
    logger.debug('Profile: removeAvatar');

    const { error } = validateByUser({
        userID: req.params.id
    });
    if (error) {
        logger.error('Profile: removeAvatar', error);
        return res.status(400)
            .json({
                status: false,
                message: error.details[0].message
            });
    }

    let profile = await Profile.update(req.params.id, {$set: req.body});

    if (profile) {
        res.status(200)
            .json({
                status: true,
                data: profile
            })
    }
};

let update = async (req: any, res: any, next: any) =>{
    logger.debug('Profile: update');
    let body = req.body;

    body.dateUpdated = moment().format();

    const { error } = validateUpdate(body);
    if (error) {
        logger.error('Profile: update', error);
        return res.status(400)
            .json({
                status: false,
                message: error.details[0].message
            });
    }

    let profile: any = await Profile.findByIdAndUpdate( req.params.id, {
        $set: body
    });

    if (profile) {
        res.status(200)
            .json({
                status: true
            })
    }
}

let getAll = (req: any, res: any, next: any) =>{
    logger.debug('Profile: getAll');

    let list = Profile.find({});

    logger.debug('Profile: getAll: list', list);

    if (list) {
        res.status(200)
            .json({
                status: true,
                data: list
            })
    }
}

let remove = async (req: any, res: any, next: any) =>{
    logger.debug('Profile: remove');

    if (!req.params.id) {
        logger.error('ProfileId was empty!');
        return res.status(400)
            .json({
                status: false,
                message: 'ProfileId was empty!'
            });
    }

    let profile = await Profile.findByIdAndRemove(req.params.id);

    if (profile) {
        res.status(200)
            .json({
                status: true
            })
    }
}


module.exports = {
    save,
    update,
    remove,
    getByUserID,
    getAll,
    getByID,
    removeAvatar
}
