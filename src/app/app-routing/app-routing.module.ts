import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importar módulos de Router
import { RouterModule, Routes } from '@angular/router';

// 2. Importar constante con rutas
// 3. Añadir parámetro "forRoot" al RouterModule con la constante.
import { routes } from './routes';

// 2. Importar módulo
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
