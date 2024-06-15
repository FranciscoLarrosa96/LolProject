import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInViewport]',
  standalone: true
})
export class InViewportDirective {
  //En el constructor de la directiva, inyectamos el ElementRef y el Renderer2.
  // El ElementRef nos proporciona acceso al elemento del DOM al que se aplica la directiva, y el Renderer2 nos permite realizar manipulaciones seguras en el DOM.
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
//La directiva utiliza el decorador @HostListener para escuchar el evento de desplazamiento (window:scroll) en la ventana.
  @HostListener('window:scroll')
  checkViewport(): void {
    //obtenemos el elemento del DOM usando this.elementRef.nativeElement
    const element = this.elementRef.nativeElement;
    //obtener el rectángulo del elemento en relación con la ventana.
    const rect = element.getBoundingClientRect();
   // Calculamos el tamaño de la ventana (tanto la altura como el ancho) utilizando window.innerHeight, window.innerWidth,
    // document.documentElement.clientHeight y document.documentElement.clientWidth.
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    //Comprobamos si el elemento está dentro del viewport comparando las coordenadas del rectángulo del elemento con las dimensiones de la ventana.
     //Si el elemento está dentro del viewport,
     // aplicamos la clase show utilizando this.renderer.addClass() y eliminamos la clase hidden utilizando this.renderer.removeClass().
     //Si no está en el viewport, hacemos lo contrario.
    const isInViewport = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= windowHeight &&
      rect.right <= windowWidth
    );
    
    if (isInViewport) {
      this.renderer.addClass(element, 'show');
      this.renderer.removeClass(element, 'hidden');
    } else {
      this.renderer.removeClass(element, 'show');
      this.renderer.addClass(element, 'hidden');
    }
  }
}
