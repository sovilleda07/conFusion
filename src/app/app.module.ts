import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 1. Importar estos tres modilos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

// 2. Importar Hammer
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

// 4. Importar Servicio
import { DishService } from './services/dish.service';

// 5. Importar Router
import { AppRoutingModule } from './app-routing/app-routing.module';
// 3. Importar módulos en decorador
@NgModule({
  // tslint:disable-next-line: max-line-length
  // tslint:disable-next-line: no-trailing-whitespace
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    AppRoutingModule,
  ],
  providers: [DishService],
  bootstrap: [AppComponent],
})
export class AppModule {}
