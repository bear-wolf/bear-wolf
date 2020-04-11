import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BasicMarketing} from './basic-marketing.model';
import {DocumentVersion} from '@shared/models/document-version.model';
import {map} from 'rxjs/operators';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Injectable({
  providedIn: 'root'
})
export class BasicMarketingService {
  constructor(
      private http: HttpClient,
      private currencyService: CurrencyService
  ) {
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`BasicMarketing/${id}`);
  }

  create(data: object): Observable<any> {
    return this.http.post(`BasicMarketing/Create`, data);
  }

  getAllVersions(id: string): Observable<DocumentVersion[]> {
    return this.http.get<DocumentVersion[]>(`BasicMarketing/${id}/versions`);
  }

  getByIdVersion(id: string, version: string): Observable<any> {
    return this.http.get<any>(`BasicMarketing/${id}/${version}`)
        .pipe( map((response: any) => {
          return new BasicMarketing(this.currencyService, response);
        }));
  }

  update(id: number, data: object, version: number): Observable<any> {
    return this.http.put(`BasicMarketing/${id}/${version}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`BasicMarketing/${id}`);
  }
}
