import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  errMess: string;
  dishIds: string[];
  prev: string;
  next: string;

  commentForm: FormGroup;
  comment: Comment;
  // 1. Nueva variable que contiene la copia del Dish modificado hasta que se publique en el servidor.
  dishcopy: Dish;

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

  ngOnInit(): void {
    this.createForm();
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        // tslint:disable-next-line: no-string-literal
        switchMap((params: Params) => this.dishService.getDish(params['id']))
      )
      .subscribe(
        (dish) => {
          this.dish = dish;
          // 2. Creamos la copia del platillo
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
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
    // 3. Empujaremos el comentario a la copia de dish.
    // Para primero modificar el objeto DishCopy, y luego publicar eso en el servidor.
    // Cuando el servidor responda con la información del plato modificada, entonces se mostrará en el cliente.
    // Llamamos al método envíandole "dishcopy", la versión modificada
    // Cuando recibamos la respuesta del servidor, manejaremos el plato entrante
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy).subscribe(
      (dish) => {
        // Igualamos el platillo actual al que viene del servidor.
        this.dish = dish;
        this.dishcopy = dish;
      },
      (errmess) => {
        // Si hay algún problema, las variables que almacenan los platillo convertimos su valor a null
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
