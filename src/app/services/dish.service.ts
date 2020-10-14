import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor() {}

  // 1. Cambio a creación de "New Promise"
  getDishes(): Promise<Dish[]> {
    return new Promise((resolve) => {
      // Simulación de retraso del servidor con 2 segundos de retraso
      setTimeout(() => resolve(DISHES), 2000);
    });
  }

  getDish(id: string): Promise<Dish> {
    return new Promise((resolve) => {
      // Simulación de retraso del servidor con 2 segundos de retraso
      setTimeout(
        () => resolve(DISHES.filter((dish) => dish.id === id)[0]),
        2000
      );
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise((resolve) => {
      // Simulación de retraso del servidor con 2 segundos de retraso
      setTimeout(
        () => resolve(DISHES.filter((dish) => dish.featured)[0]),
        2000
      );
    });
  }
}
