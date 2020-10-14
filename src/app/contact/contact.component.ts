// 3. Importar "ViewChild" para restablecer form de la plantilla
// Permitirá obtener acceso a cualquier elemento del DOM de la plantilla.
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  // 4. Utilizar "@ViewChild" para hacer referencia al FeedbackForm
  // dándole una variable de plantilla con el nombre "fform"
  // Esto nos permite obtener acceso al formulario de plantilla para luego restablecerlo
  @ViewChild('fform') feedbackFormDirective;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(): void {
    // 1. Agregar validaciones
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telnum: [0, Validators.required],
      email: ['', Validators.required],
      agree: false,
      contacttype: 'None',
      message: '',
    });
  }

  onSubmit(): void {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    // 2. Al momento de hacer reset, que regrese a los valores iniciales
    // Y luego restablecer en la plantilla el formulario también.
    this.feedbackForm.reset({
      firtsname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });
    // 5. Restablecer completamente el formulario por medio de la asignación de "@ViewChild"
    this.feedbackFormDirective.resetForm();
  }
}
