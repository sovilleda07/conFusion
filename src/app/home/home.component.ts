import { Component, OnInit } from '@angular/core';
// 1. Importar Dish y DishService
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
// 2. Importar Promotion y PromotionService
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // 3. Declarar variables para utilizar en el servicio
  dish: Dish;
  promotion: Promotion;

  // 4. Declarar servicios en el constructor
  constructor(
    private dishService: DishService,
    private promotionService: PromotionService
  ) {}

  // 5. Asignar método del servicio a la variable
  ngOnInit(): void {
    this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promotionService.getFeaturedPromotion();
  }
}
