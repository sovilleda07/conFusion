import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
// 1. Eliminar constante DISHES e importar desde el archivo dishes.ts
import { DISHES } from '../shared/dishes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishes: Dish[] = DISHES;

  // 2. No iniciarlizar la variable (quitar valor)
  selectedDish: Dish;
  constructor() {}

  ngOnInit(): void {}

  // 3. Llamar evento "onSelect" y asignar el valor enviado
  // a la variable "selectedDish"
  // tslint:disable-next-line: typedef
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
