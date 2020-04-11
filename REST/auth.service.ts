import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '@shared/modules/storage/services';
import { Session, User } from '../models';
import {RoleEnum} from '@shared/models/role.enum';

export interface iSession {
  DTCreated: string;
  DTLastActivity: string;
  DTRightsLastUpdate: string;
  Demo: boolean;
  ExpirationMinutes: number;
  CompanyID: number;
  Login: string
  ManagerID: number
  Token: string;
  Value: {};
  Instruction?: {};
}

@Injectable()
export class AuthService {
  // current session of User
  session = new BehaviorSubject<any>(null);

  constructor(
    public http: HttpClient,
    public storageService: StorageService,
    public router: Router
  ) {
  }

  signIn(model: any): Observable<any> {
    return this.http.post('Account/Authenticate', model)
  }

  signUp(model: any): Observable<any> {
    return this.http.post('sign-up', model);
  }

  setSession(session: Session) {
    const data = session.value;
    this.storageService.setAuth(JSON.stringify(data));

    this.session.next(session);
  }

  checkTokenByStore(): boolean {
    const session = this.getSessionByStore();

    return session.token ? true : false;
  }

  getUser(): User {
    let auth = this.storageService.getAuth();
    let data = JSON.parse(auth || '{}');
    let user = new User(data);

    user.setRole(data['roleId']);

    return user;
  }

  getDefaultUser() {
    const session = this.getSessionByStore();
    if (!session.token) {
      this.setSession(session.setUser(new User({
        role: RoleEnum.Guest
      })));
    } else {
      this.setSession(this.getSessionByStore());
    }
    return session.user;
  }

  getSessionByStore(): Session {
    const auth = this.storageService.getAuth();
    const data: any = JSON.parse(auth || '{}');

    const session: Session = new Session()
      .setToken(data['token'])
      .setUser(new User(data));

    return session;
  }

  makeBearToken(token: string){
    return `Bearer ${token}`;
  }

  logOut() {
    this.storageService.removeAuth();
    this.setSession(new Session().setUser(new User()));
  }
}
