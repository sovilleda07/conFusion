// 2. Importar módulo de entrada "Input"
import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
// 1. Eliminar constante "DISH"

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  // 4. Declarar decorador de "Input"
  @Input()
  // 3. Declarar variable dish e importar
  dish: Dish;

  constructor() {}

  ngOnInit(): void {}
}
