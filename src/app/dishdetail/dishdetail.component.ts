// 1. Borrar el módulo de entrada "Input"
import { Component, OnInit } from '@angular/core';
// 2. Importar Params y Location
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
// 3. Importar DishService
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;

  // 4. Habilitar servicios y locación
  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // 5. Asignar id del dishdetail
  ngOnInit(): void {
    // Tomo el valor que está en el parámetro del URL
    // tslint:disable-next-line: no-string-literal
    const id = this.route.snapshot.params['id'];

    // A la variable dish le asignamos el retorno del método getDish
    this.dish = this.dishService.getDish(id);
  }

  // 6. Crear método para regresar
  goBack(): void {
    this.location.back();
  }
}
