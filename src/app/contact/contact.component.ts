import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), expand()],
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  errMess: string;
  submittingFeedback: boolean;
  hideForm = false;

  @ViewChild('fform') feedbackFormDirective;

  // 4. Definir objeto con campos que tienen validaciones.
  // Si se detecta algún error, una cadena que contiene el mensaje correspondiente a ese error
  // se agregará a este objeto.
  formErrors = {
    // tslint:disable-next-line: object-literal-key-quotes
    firstname: '',
    // tslint:disable-next-line: object-literal-key-quotes
    lastname: '',
    // tslint:disable-next-line: object-literal-key-quotes
    telnum: '',
    // tslint:disable-next-line: object-literal-key-quotes
    email: '',
  };

  // 5. Definir objeto con mensajes de error
  validationMessages = {
    firstname: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'FirstName cannot be more than 25 characters long.',
    },
    lastname: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be at least 2 characters long.',
      maxlength: 'Last Name cannot be more than 25 characters long.',
    },
    telnum: {
      required: 'Tel. number is required.',
      pattern: 'Tel. number must contain only numbers.',
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.',
    },
  };

  constructor(
    private feedbackService: FeedbackService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  // 1. Agregar más validaciones
  // Cuando es "Validators.patter" se agrega en el elemento un atributo con el patrón.
  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.pattern]],
      agree: false,
      contacttype: 'None',
      message: '',
    });

    // 2. Cuando el Formulario experimenta cambios en cualquiera de sus elementos
    // Angular Framework proporciona un Observable llamado "ValueChanges"
    // Lo utilizaremos en el formulario de Comentarios
    // ahora se puede suscribir dentro de este método en particular.

    // Dentro de la suscripción se especificará lo que se debe hacer cuando los "ValueChanges"
    // Se obtendrán algunos datos de la granja, para indicar que elemento de forma particular
    // ha experimentado el cambio en el valor.
    // Luego de eso, se activará un método local "onValueChanged" y luego se suministrará esos
    // datos como un parámetro para este método.
    this.feedbackForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    // Dentro del evento se iniciará la validación del formulario y definir adecuadamente los
    // mensajes de error del formulario, en función del objeto (data).

    // 3. Llamar al método "onValueChanged" sin parámetro para restablecer los mensajes de validación.
    this.onValueChanged(); // (re) set form validation messages
  }

  // 6. Método "onValueChanged"
  onValueChanged(data?: any): void {
    // Si feedbackForm no ha sido creado
    if (!this.feedbackForm) {
      return;
    }
    // Definir constante
    const form = this.feedbackForm;
    // Este campo tomará el objeto (formErrors) y comprobar los 4
    // Así que detecta cualquier cambio
    // Si se llama al método sin parámetro, se borrarán todos los campos de "formErrors"
    for (const field in this.formErrors) {
      // En caso de que haya adjuntado algún msj a estos campos
      // de formulario, se borrarán todos.
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        // Obtener acceso a ese campo de formulario en particular
        const control = form.get(field);
        // Para cada uno de los campos se valida si no es nulo, ya está sucio y no válido
        if (control && control.dirty && !control.valid) {
          // Verifcar qué tipo de errores se han agregado a ese control.
          // Estamos recogiendo todos los mensajes de validación correspondientes a ese campo.
          // Luego verificaré, y veré su necesito agregar esto al campo.
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            // Si hay algún error, agregaré este campo de formErrors
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(): void {
    this.hideForm = true;

    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackService.submitFeedback(this.feedback).subscribe(
      (feedb) => {
        this.feedback = feedb;
        const that = this;

        // tslint:disable-next-line: only-arrow-functions
        setTimeout(function(): void {
          that.hideForm = false;
          that.feedback = null;

          that.feedbackForm.reset({
            firstname: '',
            lastname: '',
            telnum: 0,
            email: '',
            agree: false,
            contacttype: 'None',
            message: '',
          });

          that.feedbackFormDirective.resetForm();
        }, 5000);
      },
      (errmess) => {
        this.feedback = null;
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        this.errMess = <any>errmess;
      }
    );
  }
}
