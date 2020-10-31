import { Injectable } from '@angular/core';
// 1. Importar ¨throwError¨ para arrojar errores cada vez que surjan
import { throwError } from 'rxjs';
// 2. Importar "HttpErrorResponse"
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProcessHttpMsgService {
  constructor() {}
  // 3. Agregar método para el manejo de errores, cuando aparezcan.
  // Una respuesta de error del servidor.
  // tslint:disable-next-line: typedef
  public handleError(error: HttpErrorResponse | any) {
    // Construir un mensaje que resuma de qué se trata el error
    let errMsg: string;

    // Si se trata de la instancia de un evento error
    if (error.error instanceof ErrorEvent) {
      // Contendrá información y establecemos el mensaje en la variable.
      errMsg = error.error.message;
    }
    // Si ese no es el caso, significa que viene del lado del servidor.
    else {
        // El mensaje se construye de la siguiente manera'
        // Si no existe el statusText, será una cadena vacía.
        errMsg = `${error.status} - ${error.statusText} ${error.error}`;
    }

    // Devolver un error observable a nuestra aplicación.
    return throwError(errMsg);
  }
}
