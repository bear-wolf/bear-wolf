import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocumentVersion} from '@shared/models/document-version.model';
import {map} from 'rxjs/operators';
import {Training} from '../activity-training/training.model';
import {VolumeAgreement} from './volume-agreement.model';
import {CurrencyStoreService} from '@shared/services/currency-store.service';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Injectable({
  providedIn: 'root'
})
export class VolumeAgreementService {
  constructor(
      private http: HttpClient,
      private currencyService: CurrencyService
  ) {
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`VolumeAgreement/${id}`);
  }

  getAllVersions(id: string): Observable<DocumentVersion[]> {
    return this.http.get<DocumentVersion[]>(`VolumeAgreement/${id}/versions`);
  }

  getByIdVersion(id: string, version: string): Observable<any> {
    return this.http.get<any>(`VolumeAgreement/${id}/${version}`)
        .pipe( map((response) => {
          return new VolumeAgreement(this.currencyService, response);
        }));
  }

  create(data: object): Observable<any> {
    return this.http.post(`VolumeAgreement/Create`, data);
  }

  update(id: number, data: object, version: number): Observable<any> {
    return this.http.put(`VolumeAgreement/${id}/${version}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`VolumeAgreement/${id}`);
  }
}
