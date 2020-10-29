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

  // 1. Inyectar el BaseURL
  constructor(private dishService: DishService,
              @Inject('BaseURL') public BaseURL) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.dishService.getDishes()
    .subscribe((dishes) => this.dishes = dishes);
  }

}
