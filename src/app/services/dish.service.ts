import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
// 1. Importar "HttpClient" y baseURL
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  // 2. Inyectar "http" para poder acceder a los métodos para las peticiones
  constructor(private http: HttpClient) {}

  // 3. Cambiar returns
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map((dishes) => dishes[0]));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(
      map((dishes) => dishes.map((dish) => dish.id))
    );
  }
}
