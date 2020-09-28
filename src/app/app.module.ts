import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 1. Importar estos tres modilos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

// 2. Importar Hammer
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';

// 3. Importar módulos en decorador
@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
