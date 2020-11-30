import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor(
    private http: HttpClient,
    // tslint:disable-next-line: no-shadowed-variable
    private ProcessHttpMsgService: ProcessHttpMsgService
  ) {}

  getPromotions(): Observable<Promotion[]> {
    return this.http
      .get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http
      .get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http
      .get<Promotion[]>(baseURL + 'promotions?featured=true')
      .pipe(map((promotions) => promotions[0]))
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }
}
