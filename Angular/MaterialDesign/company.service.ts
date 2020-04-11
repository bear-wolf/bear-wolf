import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {iFilter} from '../_models/index';

import { Observable } from 'rxjs/Observable';
import {
  ClientFullInfo, iMainClient
} from '../_models/clients';
import {CommonService} from './common.service';
import {Search} from '../_models/common';
import {FullCompanyType, iCompanyCreate, iCompanyType} from '../_models/company';
import {ClientCreationInfo} from './client.service';
import {Router} from '@angular/router';

@Injectable()
export class CompanyService extends CommonService{

    constructor(public http: HttpClient, public router: Router) {
      super(http, router);
    }

    getDetails():Observable<FullCompanyType>{
        return this.http.post<FullCompanyType>('company.get', {}) ;
    }

    getDetailsByID(companyID: number):Observable<FullCompanyType>{
      return this.http.post<FullCompanyType>('companies.get', {
        ID: companyID
      }) ;
    }

    createCompany(company: iCompanyCreate):Observable<iCompanyType>{
      return  this.http.post<iCompanyType>('companies.add', company, {});
    }

    load<T extends Search>(search: iFilter): Observable<T> {
      return this.http.post<T>(search.entitySearch, {});
    }
}
