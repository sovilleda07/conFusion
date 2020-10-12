import { Component, OnInit } from '@angular/core';
// 1. Importar para hacer uso del Dialog Component en el encabezado
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // 2. Inyectar en el constructor el diálogo
  // Este es un servicio que nos permite abrir el componente como un componente de diálogo
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  // 3. Función para activar la visualización del componente de diálogo
  // tslint:disable-next-line: typedef
  openLoginForm() {
    // Usar propiedad "Open" a la que se suministra el componente que va a actuar como la
    // vista para el diálogo que se superpone en la parte superior de la vista web actual.
    // Especificar un tamaño para el diálogo
    this.dialog.open(LoginComponent, { width: '500px', height: '450px' });
  }
}
