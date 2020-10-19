import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
// 3. Importar "SwitchMap"
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  // 1. Declarar variable para almacenar los ID's de los platos
  dishIds: string[];
  prev: string;
  next: string;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // 2. Cambios para obtener el parámetro del URL
  ngOnInit(): void {
    // 2.2
    // Obtener todos los ids de los platos
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));

    // 2.1
    // Tener acceso a los parámetros observables
    // De los parámetros observables obtenemos parámetros que son del tipo Params
    // Por lo tanto, importamos la biblioteca del enrutador.
    // Somos capaces de hacer este parámetro de ruta para obtener los parámetros observables
    // Se utiliza "SwitchMap" en los parámetros observables
    // Y luego cuando se obtienen los parámetros observables, los tomamos
    // Y luego llamamos al método.
    this.route.params
      .pipe(
        // tslint:disable-next-line: no-string-literal
        switchMap((params: Params) => this.dishService.getDish(params['id']))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });

    // Cada vez que los parámetros observables cambian el valor, lo que significa que el
    // parámetro de ruta cambia el valor, inmediatamente el operador "SwitchMap" tomará
    // el valor de parámetros, luego hará un "GetDish" desde mi "DishService".

    // Por lo tanto, estamos creando un nuevo observable que es GetDish, que va
    // a devolver el objeto plato aquí.
    // Una vez teniendo "GetDish", eso ahora puede estar disponible como observable.
    // También se susccribe a ese observable, entonces allí se obtiene el plato.
    // Así que de esta manera, "dish" ahora se actualiza.
  }

  // 2.3 Creación de métodos para navegar entre los platillo
  setPrevNext(dishId: string): void {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }
}
