import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
// import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  constructor(
    private http: HttpClient,
    // tslint:disable-next-line: no-shadowed-variable
    private ProcessHttpMsgService: ProcessHttpMsgService
  ) {}

  getLeaders(): Observable<Leader[]> {
    // return of(LEADERS).pipe(delay(2000));
    return this.http
      .get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http
      .get<Leader>(baseURL + 'leadership/' + id)
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http
      .get<Leader[]>(baseURL + 'leadership?featured=true')
      .pipe(map((leaders) => leaders[0]))
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }
}
