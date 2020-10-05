// 1. Importar rutas
import { Routes } from '@angular/router';

// 2. Importar lista de todos los componentes de la aplicación
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

// 3. Declarar constante de rutas, para permitir definir una matriz
// especificando las diversas rutas que forman parte de la aplicación.
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'dishdetail/:id', component: DishdetailComponent },
  { path: 'contactus', component: ContactComponent },
  { path: 'aboutus', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
