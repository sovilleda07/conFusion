import { Component, OnInit } from '@angular/core';
// 1. Importar para crear formulario
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// 2. Importar Clase y constante de Feedback
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  // 3. Declarar variables:
  // - Este es el modelo del formulario que va a alojar la forma reactiva.
  feedbackForm: FormGroup;
  // - Este es el modelo de datos correspondientes.
  feedback: Feedback;
  contactType = ContactType;

  // 4. Inyectar FormBuilder para construir la forma Reactiva dentro del constructor.
  constructor(private fb: FormBuilder) {
    // 5. Crear método para que cuando se construya la clase, se creará el formulario.
    this.createForm();
  }

  ngOnInit(): void {
  }

  // Crear el Reactive Form y luego se pondrá en la variable "FeedbackForm"
  createForm(): void {
    // Para crear el formulario, tomaremos ayuda del "FormBuilder"
    // con la propiedad "Group" podemos definir un grupo "FormGroup"
    this.feedbackForm = this.fb.group({
      // Aquí dentro, vamos a construir las partes de la forma (Form Structure)
      // y luego mapearlo a la vista
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message:  ''
    });

  }

  // 6. Crear método onSubmit
  onSubmit(): void {
    // El modelo de formulario es exactamente el mismo que los modelos de datos
    // por lo que simplemente puedo tomar el valor del modelo de formulario.
    // Con la propiedad "value" permite recuperar el valor actual de todo el formulario.
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    // Reset el formulario
    this.feedbackForm.reset();
  }

}
