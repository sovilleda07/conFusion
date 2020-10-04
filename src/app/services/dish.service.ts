import { Injectable } from '@angular/core';
// 1. Importar Dish
import { Dish } from '../shared/dish';
// 2. Impotar DISHES
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor() {}

  // 3. Crear método que devulve la matriz de DIHES
  getDishes(): Dish[] {
    return DISHES;
  }
}
