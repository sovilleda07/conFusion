import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
// 1. Eliminar importación directa e importar el servicio
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishes: Dish[];

  selectedDish: Dish;
  // 2. Habilitar en el constructor el servicio
  // Cuando se crea este componente, se inyecta el DishService en el módulo
  // de la aplicación, se creará un solo objeto DishService que estará
  // disponible dentro de su componente
  constructor(private dishService: DishService) {}

  // 3. Utilizar el evento On Init para hacer uso del servicio
  // y almacenar la información en la variable "dishes"
  // todo cuando se cree una instancia del componente
  // tslint:disable-next-line: typedef
  ngOnInit() {
    // Utilizamos el método para obtener el JSON con la información
    this.dishes = this.dishService.getDishes();
  }

  // tslint:disable-next-line: typedef
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
