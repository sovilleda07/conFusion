import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

// Funciones para exportar los diversos Triggers

// Devolverá el Trigger para DishComponent
// tslint:disable-next-line: typedef
export function visibility() {
  return trigger('visibility', [
    state(
      'shown',
      style({
        transform: 'scale(1.0)',
        opacity: 1,
      })
    ),
    state(
      'hidden',
      style({
        transform: 'scale(0.5)',
        opacity: 0,
      })
    ),
    transition('* => *', animate('0.5s ease-in-out')),
  ]);
}

// tslint:disable-next-line: typedef
export function flyInOut() {
  return trigger('flyInOut', [
    state('*', style({ opacity: 1, transform: 'translateX(0)' })),
    /* Entrar en la transición
            Significa que la vista está entrando en la aplicación, que ahora cuando camino a
            una vista en particular en la aplicacion SPA; la vista entrará en la vista */
    // La vista está completamente fuera de la vista
    transition(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      animate('500ms ease-in'),
    ]),
    /* Dejar
            Se puede aplicar cuando se para de esta vista y luego se está tomando la vista desde
            la salida del enrutador de la aplicación. */
    transition(':leave', [
      animate(
        '500ms ease-out',
        style({ transform: 'translateX(100%)', opacity: 0 })
      ),
    ]),
  ]);
}

// tslint:disable-next-line: typedef
export function expand() {
  return trigger('expand', [
    state('*', style({ opacity: 1, transform: 'translateX(0)' })),
    transition(':enter', [
      style({ transform: 'translateY(-50%)', opacity: 0 }),
      animate(
        '200ms ease-in',
        style({ opacity: 1, transform: 'translateX(0)' })
      ),
    ]),
  ]);
}
