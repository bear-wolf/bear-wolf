import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocumentVersion} from '@shared/models/document-version.model';
import {map} from 'rxjs/operators';
import {Training} from '../activity-training/training.model';
import {Dma} from './dma.model';
import { CurrencyService } from '@shared/components/currency/currency.service';

@Injectable({
  providedIn: 'root'
})
export class DmaService {
  constructor(
      private http: HttpClient,
      private currencyService: CurrencyService
  ) {
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`Dma/${id}`);
  }

  getByIdVersion(id: string, version: string): Observable<any> {
    return this.http.get<any>(`Dma/${id}/${version}`)
        .pipe( map((response) => {
          return new Dma(this.currencyService, response);
        }));
  }

  create(data: object): Observable<any> {
    return this.http.post(`Dma/Create`, data);
  }
  getAllVersions(id: string): Observable<DocumentVersion[]> {
    return this.http.get<DocumentVersion[]>(`Dma/${id}/versions`);
  }

  update(id: number, data: object, version: number): Observable<any> {
    return this.http.put(`Dma/${id}/${version}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`Dma/${id}`);
  }
}
