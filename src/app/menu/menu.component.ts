import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishes: Dish[];

  // Es posible que el error sea entregado por el lanzamiento del observable
  // y resulta que el mesnaje esté disponible para nosotros.

  // 1. Crear nueva variable
  errMess: string;

  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public BaseURL
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // 2. El método "subscribe" en sí proporciona una forma de manejar errores.
    // Podemos definir una segunda función que se llamará cuando el resultado sea error,
    // con el valor devuelto cuando el lanzamiento observable es hecho por "DishService"
    this.dishService.getDishes().subscribe(
      (dishes) => (this.dishes = dishes),
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      (errmess) => (this.errMess = <any> errmess)
    );
    // Cuando el observable es devuelto por el "DishService" es un Valor,
    // entonces eso sería manejado por la primera parte.
    // Si el observable es devuelto con el lanzamiento del observable, entonces la función del error será ejecutada.
  }
}
