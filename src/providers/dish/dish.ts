import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Dish } from '../../shared/dish';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {
  constructor(
    public http: HttpClient,
    private processHttpmsgService: ProcessHttpmsgProvider,
    @Inject('BaseURL') public BaseURL
  ) {}

  getDishes(): Observable<Dish[]> {
    return this.http
      .get(this.BaseURL + 'dishes')
      .pipe(catchError(this.processHttpmsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http
      .get<Dish>(this.BaseURL + 'dishes/' + id)
      .pipe(catchError(this.processHttpmsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish[]>(this.BaseURL + 'dishes?featured=true')
      .pipe(map(res => res[0]))
      .pipe(catchError(this.processHttpmsgService.handleError));
  }
}
