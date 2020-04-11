import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocumentVersion} from '@shared/models/document-version.model';
import {map} from 'rxjs/operators';
import {Training} from '../activity-training/training.model';
import {BonusAgreement} from './bonus-agreement.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Injectable({
  providedIn: 'root'
})
export class BonusAgreementService {
  constructor(
      private http: HttpClient,
      private currencyService: CurrencyService,
  ) {
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`BonusAgreement/${id}`);
  }

  getAllVersions(id: string): Observable<DocumentVersion[]> {
    return this.http.get<DocumentVersion[]>(`BonusAgreement/${id}/versions`);
  }

  getByIdVersion(id: string, version: string): Observable<any> {
    return this.http.get<any>(`BonusAgreement/${id}/${version}`)
        .pipe( map((response) => {
          return new BonusAgreement(this.currencyService, response);
        }));
  }

  create(data: object): Observable<any> {
    return this.http.post(`BonusAgreement/Create`, data);
  }

  update(id: number, data: object, version: number): Observable<any> {
    return this.http.put(`BonusAgreement/${id}/${version}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`BonusAgreement/${id}`);
  }
}
