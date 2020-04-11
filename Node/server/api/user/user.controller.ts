export {}
import moment from "moment";
const { User, validateUserSingIn, validateUserAdd } = require("../../../../Mongo/models/user.schema");
const bcrypt = require("bcrypt");
import { Session } from "../shared/models/session.model";
const globalAny: any = global;
const logger = require( "./../../../../boot/winston")();

let signUp = async (req: any, res: any, next: any)=>{
    let body = req.body;
    console.log('signUp')
    const { error } = validateUserAdd(body);
    if (error) {
        return res.status(400)
            .json({
                status: false,
                message: error.details[0].message
            });
    }

    body.password = await bcrypt.hash(body.password, 10);

    let user = new User({
        email: body.email,
        login: body.login,
        password: body.password,
        firstName: body.firstName,
        secondName: body.secondName,
        middleName: body.middleName,
        date_create: moment().format()
    })

    await user.save();

    res.json({
        status: true,
        data: user
    });
};

let signIn = async (req: any, res: any, next: any) =>{
    let body = req.body;
    logger.debug('signIn');

    const { error } = validateUserSingIn(body);
    if (error) {
        logger.error('SignIn:Error', error);
        return res.status(400)
            .json({
                message: error.details[0].message
            });
    }

    let user = await User.findOne({
        login: body.login,
        password: body.password
    })
    if (user) {
        //const token = user.generateAuthToken();
        const token = globalAny.gConfig.token;

        let data = {};
        let _session = new Session({
            user: user,
            languageID: '5de4eb28d250d2fbc4bae343'
        });
        // @ts-ignore
        data[token] = _session;
        globalAny['session'] = data;
        logger.debug('New session:', data);

        // @ts-ignore
        _session[Session.tokenKey] = token;
        // @ts-ignore
        _session['user'] = user;
        res.status(200);
        res.header(Session.tokenKey, token);
        res.json(_session)
    }

    res.status(400).json({});
};

let get = (req: any, res: any, next: any) =>{
    logger.info('User: get');
    User.find({}, function(error:any, item: any) {
        if (error) {
            res.status(400)
                .json({
                    status: false,
                    data: [],
                    message: error.details[0].message
                })
        }

        res.status(200)
            .json({
                status: true,
                data: item
            })
    });
}

let post = (req: any, res: any, next: any) =>{
    throw new Error('post method not realization')
}

let remove = (req: any, res: any, next: any) =>{
   throw new Error('Remove method not realization')
}

module.exports = {
    get,
    post,
    remove,
    signUp,
    signIn
}
