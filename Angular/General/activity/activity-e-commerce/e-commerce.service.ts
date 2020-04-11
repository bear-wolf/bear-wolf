import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocumentVersion} from '@shared/models/document-version.model';
import {map} from 'rxjs/operators';
import {BasicMarketing} from '../activity-basic-marketing/basic-marketing.model';
import {ECommerce} from './e-commerce.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Injectable({
  providedIn: 'root'
})
export class ECommerceService {
  constructor(
      private http: HttpClient,
      public currencyService: CurrencyService,
  ) {
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`ECommerce/${id}`);
  }

  getByIdVersion(id: string, version: string): Observable<any> {
    return this.http.get<any>(`ECommerce/${id}/${version}`)
        .pipe( map((response) => {
          return new ECommerce(this.currencyService, response);
        }));
  }

  create(data: object): Observable<any> {
    return this.http.post(`ECommerce/Create`, data);
  }

  getAllVersions(id: string): Observable<DocumentVersion[]> {
    return this.http.get<DocumentVersion[]>(`ECommerce/${id}/versions`);
  }

  update(id: number, data: object, version: number): Observable<any> {
    return this.http.put(`ECommerce/${id}/${version}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`ECommerce/${id}`);
  }
}
