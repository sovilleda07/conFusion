import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { trigger, state, style, animate, transition } from '@angular/animations';

// Añadir los activadores de animación en el decorador de componentes
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    // Definir disparador
    trigger('visibility', [
      state('shown', style({
          transform: 'scale(1.0)',
          opacity: 1
      })),
      state('hidden', style({
          transform: 'scale(0.5)',
          opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
  ])
  ]
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  errMess: string;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  dishcopy: Dish;

  // Configurar visibilidad inicialmente como "Shown"
  visibility = 'shown';

  formErrors = {
    author: '',
    rating: 5,
    comment: '',
  };

  validationMessages = {
    author: {
      required: 'Author is required',
      minlength: 'Author must be at least 2 character long.',
    },
    comment: {
      required: 'Comment is required.',
      minlength: 'Comment must be at least 1 characters long.',
    },
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL
  ) {}
  /* Esto sucede cada vez que se está cambiando entre platos
  Cuando comience a buscar el nuevo plato tras el cambio de los parámetros de ruta,
  se establecerá la visibilidad como 'Hidden' para que ese plato actual que se está
  mostrando en la vista, se oculte.
  Y entonces cuando el nuevo plato esté disponible (eso sucederá cuando se llame la suscripción cuando ese observable esté disponible)
  Y luego, cuando el plato esté disponible y luego, se coloca y se restaura la visibilidad a 'shown'.
  */
  ngOnInit(): void {
    this.createForm();
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        // tslint:disable-next-line: no-string-literal
        switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); })
      )
      .subscribe(
        (dish) => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        },
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (errmess) => (this.errMess = <any> errmess)
      );
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged();
  }

  onValueChanged(data?: any): void {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(): void {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy).subscribe(
      (dish) => {
        this.dish = dish;
        this.dishcopy = dish;
      },
      (errmess) => {
        this.dish = null;
        this.dishcopy = null;
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        this.errMess = <any> errmess;
      }
    );
    // this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
    });
  }

  // tslint:disable-next-line: typedef
  formatLabel(value: number) {
    return value;
  }

  setPrevNext(dishId: string): void {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }
}
