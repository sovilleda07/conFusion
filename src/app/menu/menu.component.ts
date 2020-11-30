import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

// 1. Incluir nuevas propiedades
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // Aqui se asegura de que la animación en particular ocurra cuando se produccen cambios de ruta
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
  },
  animations: [
    flyInOut(),
    expand()
  ],
})
export class MenuComponent implements OnInit {
  dishes: Dish[];

  errMess: string;

  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public BaseURL
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.dishService.getDishes().subscribe(
      (dishes) => (this.dishes = dishes),
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      (errmess) => (this.errMess = <any>errmess)
    );
  }
}
