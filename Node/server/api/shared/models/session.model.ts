interface iSession {
    user: any;
    languageID: string;
}

interface iUser {
    _id: string,
    login: string
}


class Session {
    static tokenKey: string = 'x-auth-token';

    public token: string;
    public user: iUser;
    public languageID: string;

    constructor(data: iSession) {
        this.user = data.user;
        this.languageID = data.languageID;
    }
}

export {
    Session,
    iSession,
    iUser
};
