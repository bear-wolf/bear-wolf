import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {DocumentVersion} from '@shared/models/document-version.model';
import {map} from 'rxjs/operators';
import {BasicMarketing} from '../activity-basic-marketing/basic-marketing.model';
import {JointAgreement} from './joint-agreement.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Injectable({
  providedIn: 'root'
})
export class JointAgreementService {
  constructor(
    private http: HttpClient,
    public currencyService: CurrencyService,
  ) {
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`JointAgreement/${id}`);
  }

  create(data: object): Observable<any> {
    return this.http.post(`JointAgreement/Create`, data);
  }

  getAllVersions(id: string): Observable<DocumentVersion[]> {
    return this.http.get<DocumentVersion[]>(`JointAgreement/${id}/versions`);
  }

  getByIdVersion(id: string, version: string): Observable<any> {
    return this.http.get<any>(`JointAgreement/${id}/${version}`)
        .pipe( map((response) => {
          return new JointAgreement(this.currencyService, response);
        }));
  }

  update(id: number, data: object, version: number): Observable<any> {
    return this.http.put(`JointAgreement/${id}/${version}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`JointAgreement/${id}`);
  }
}
