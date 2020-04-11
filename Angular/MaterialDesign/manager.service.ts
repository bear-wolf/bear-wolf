import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ApiResult} from '../_models/index';
import { Token } from './auth.service';
import {iListManagers, iManagerCreate, ManagerCompany, ManagerType} from '../_models/managers';
import {CommonService} from './common.service';
import {Router} from '@angular/router';

@Injectable()
export class ManagerService extends CommonService{
    constructor(public http: HttpClient, public router: Router) {
      super(http, router);
    }

    createManager(manager: any):Observable<ManagerType>{
        return this.http.post<ManagerType>('managers.add', manager)
    }

    getManagerDetails<T = ManagerType>(managerID: number):Observable<T>{
        return this.http.post<T>('managers.get', {
            ID: managerID
        });
    }
    updateManager<T = ManagerType>(manager: ManagerType):Observable<T>{
        return this.http.post<T>('managers.set', manager) ;
    }
    getMethods<T = any>(managerID: number, companyID: number):Observable<T>{
        return this.http.post<T>('managers.getMethods', {
            CompanyID: companyID,
            ManagerID: managerID
        });
    }
    setMethods<T = any>(managerID: number, array: string[]):Observable<T>{
        return this.http.post<T>('managers.setMethods', {
            Methods: array,
            ManagerID: managerID
        });
    }

    setPassword(clientID: number, newPassword: string):Observable<string>{
        return this.http.post<string>('clients.setPassword', {
            ClientID: clientID,
            Value: newPassword
        });
    }
}
