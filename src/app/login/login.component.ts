import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // 1. Crear objeto JSON para el manejo de la información
  user = {
    username: '',
    password: '',
    remember: false,
  };

  // 2. Inyectar la referencia al diálogo en el constructor
  // Referencia al LoginComponent.
  constructor(public dialogRef: MatDialogRef<LoginComponent>) {}

  ngOnInit(): void {}

  // 3. Crear función "onSubmit"
  onSubmit(): void {
    // Imprimir en consola el objeto
    console.log('User: ', this.user);
    // Cerrar diálogo: cuando se envíe la información, también queremos descartar
    // el componente de diálogo allí; por eso se hace la referencia en el constructor.
    this.dialogRef.close();
  }
}
