import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInViewport]'
})
export class InViewportDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:scroll')
  checkViewport(): void {
    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
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
