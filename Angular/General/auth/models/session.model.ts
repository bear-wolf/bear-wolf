import {User} from '@shared/models/user.model';

export interface iSession {
  token: string;
  user: User;
}

export class Session {
    token: string;
    user: User;

    static key: 'Session';

    constructor (data?: iSession) {
        if (data) {
            this.setUser(new User(data));
        }
    }

    // get JSON of data
    get value(){
      let data: any = this.user.value;
      data['token'] = this.token;
      data['role'] = this.user.role;

      return data;
    }

    setToken(token: string) {
      this.token = token;

      return this;
    }

    getToken(token: string) {
      this.token = token;

      return this;
    }

    setUser(user: User) {
      this.user = user;

      return this;
    }
}
