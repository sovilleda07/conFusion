import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  // 1. Inyectar en el constructor
  constructor(private el: ElementRef,
              private renderer: Renderer2) {}
  // 2. Usaremos el HostListener, y cuando ocurra el evento "mouseenter"
  // Llamaremos el método "onMouseenter"
  // tslint:disable-next-line: typedef
  @HostListener('mouseenter') onMouseEnter() {
    // Cuando el mouse entre en una región en particular, se resaltará el elemento.
    this.renderer.addClass(this.el.nativeElement, 'highlight');
  }
  // 3. Usaremos el HostListener, y cuando ocurra el evento "mouseleave"
  // Llamaremos el método "onMouseLeave"
  // tslint:disable-next-line: typedef
  @HostListener('mouseleave') onMouseLeave() {
    // Cuando el mouse se aleje de una región en particular, ya no se resaltará
    this.renderer.removeClass(this.el.nativeElement, 'highlight');
  }
}
