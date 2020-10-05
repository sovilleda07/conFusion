import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor() {}

  // Método para obtener todos los platillos
  getDishes(): Dish[] {
    return DISHES;
  }

  // 1. Crear nuevos métodos

  // Método para obtener un platillo por su ID
  getDish(id: string): Dish {
    return DISHES.filter((dish) => dish.id === id)[0];
  }

  // Método para establecer un platillo como destacado
  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }
}
