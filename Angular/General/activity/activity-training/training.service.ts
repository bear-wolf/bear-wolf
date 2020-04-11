import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocumentVersion} from '@shared/models/document-version.model';
import {map} from 'rxjs/operators';
import {MarketingPlan} from '../../marketing-plan/marketing-plan.model';
import {Training} from './training.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor(
      private http: HttpClient,
      public currencyService: CurrencyService
  ) {
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`Training/${id}`);
  }

  getByIdVersion(id: string, version: string): Observable<any> {
    return this.http.get<any>(`Training/${id}/${version}`)
        .pipe( map((response) => {
          return new Training(this.currencyService, response);
        }));
  }

  getAllVersions(id: string): Observable<DocumentVersion[]> {
    return this.http.get<DocumentVersion[]>(`Training/${id}/versions`);
  }

  create(data: object): Observable<any> {
    return this.http.post(`Training/Create`, data);
  }

  update(id: number, data: object, version: number): Observable<any> {
    return this.http.put(`Training/${id}/${version}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`Training/${id}`);
  }
}
