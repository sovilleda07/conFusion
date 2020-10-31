import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
// 1. Importamos "catchError"
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
// 2. Importamos el ProcessHttpMsgService para poder usar el método de ErrorHandle
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  // 3. Inyectamos el "ProcessHttpMsgService"
  constructor(private http: HttpClient,
              // tslint:disable-next-line: no-shadowed-variable
              private ProcessHttpMsgService: ProcessHttpMsgService) { }

  // 4. Cambiar métodos para el manejo de errores
  // Canalizaremos el método catchError, luego se llama al método HandleError
  // De esta manera cuando HttpClient devuelva un error, este se procesará y
  // se extraerá el mensaje de error apropiado y luego terminará arrojando el error
  // a través de el método HandleError.
  getDishes(): Observable<Dish[]> {
    return this.http
      .get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return this.http
      .get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map((dishes) => dishes[0]))
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }

  // En este no se necesita hacer el manejo de errores porque se utiliza el
  // método "getDishes" que ya tiene su manejo.
  // Sólo necesitamos detectar el rror y luego devolver el error de "getDishIds"
  getDishIds(): Observable<string[] | any> {
    return this.getDishes()
      .pipe(map((dishes) => dishes.map((dish) => dish.id)))
      .pipe(catchError(error => error));
  }
}
