import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(
    private http: HttpClient,
    // tslint:disable-next-line: no-shadowed-variable
    private ProcessHttpMsgService: ProcessHttpMsgService
  ) {}

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

  getDishIds(): Observable<string[] | any> {
    return this.getDishes()
      .pipe(map((dishes) => dishes.map((dish) => dish.id)))
      .pipe(catchError((error) => error));
  }

  // 1. Crear método para hacer insertar los nuevos comentarios de un platillo
  // Recibe el plato modificado como parámetro y luego devolverá un tipo Observable de Dish.
  // Esto devolverá el plato que se ha puesto en el lado del servidor.
  // Una vez sea modificada en el servidor, éste devolverá la información modificada de vuelta al cliente.
  putDish(dish: Dish): Observable<Dish> {
    // 1.2 Configurar opciones HTTP para que informemos al servidor sobre lo que está siendo enviada en el mensaje aquí.
    const httpOptions = {
      // Configurar algunos encabezados con "HttpHeaders"
      headers: new HttpHeaders({
        // Especificar al servidor, que el mensaje de solicitud entrante contiene la información en forma de JSON.
        'Content-Type': 'application/json',
      }),
    };

    // Utilizamos el "HttpClient" para hacer el "Put" con el cuerpo del mensaje del platillo
    // URL de base, ruta de la petición, id del platillo, el platillo como tal y la configuración del encabezado.
    return this.http
      .put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }
}
