import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../dish/dish';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {
  favorites: Array<any>;
  constructor(public http: HttpClient, private dishservice: DishProvider) {
    this.favorites = [];
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) this.favorites.push(id);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice
      .getDishes()
      .pipe(
        map(dishes =>
          dishes.filter(dish => this.favorites.some(el => el === dish.id))
        )
      );
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    const index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      return this.getFavorites();
    } else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existante favorite' + id);
    }
  }
}
