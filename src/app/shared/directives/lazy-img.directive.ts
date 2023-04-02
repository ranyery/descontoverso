import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: 'img' })
export class LazyImgDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const hasLazyLoadingSupport = 'loading' in HTMLImageElement.prototype;
    if (hasLazyLoadingSupport) nativeElement.setAttribute('loading', 'lazy');
  }
}
