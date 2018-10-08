import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Leader } from '../../shared/leader';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {
  constructor(
    public http: HttpClient,
    private processHttpmsgService: ProcessHttpmsgProvider,
    @Inject('BaseURL') public BaseURL
  ) {}

  getLeaders(): Observable<Leader[]> {
    return this.http
      .get(this.BaseURL + 'leaders')
      .pipe(catchError(this.processHttpmsgService.handleError));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http
      .get<Leader>(this.BaseURL + 'leaders/' + id)
      .pipe(catchError(this.processHttpmsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http
      .get<Leader[]>(this.BaseURL + 'leaders?featured=true')
      .pipe(map(res => res[0]))
      .pipe(catchError(this.processHttpmsgService.handleError));
  }
}
