import { Injectable } from '@angular/core';
// 1. Impotar clase
import { Promotion } from '../shared/promotion';
// 2. Importar constante
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor() {}

  // Método para obtener todas las promociones
  getPromotions(): Promotion[] {
    return PROMOTIONS;
  }

  // 1. Crear nuevos métodos

  // Método para obtener una promoción por su ID
  getPromotion(id: string): Promotion {
    return PROMOTIONS.filter((promo) => promo.id === id)[0];
  }

  // Método para establecer un platillo como destacado
  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((promo) => promo.featured)[0];
  }
}
