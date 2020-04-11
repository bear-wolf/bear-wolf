import {iUser, Session} from "../shared/models/session.model";
const logger = require( "./../../../../boot/winston")();
const globalAny: any = global;

export class AuthController {
    static tokenKey: string = 'x-access-token';

    constructor(){

    }

    static getAuth(req: any): Session {
        logger.debug('getAuthUser', globalAny.session);
        let token = req.headers[AuthController.tokenKey];
        logger.debug('token', token);
        return new Session(globalAny.session[token]);
    }
}

exports = {
    AuthController,
}

