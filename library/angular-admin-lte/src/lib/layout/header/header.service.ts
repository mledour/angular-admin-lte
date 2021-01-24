import { Injectable, ElementRef } from '@angular/core';


@Injectable()
export class HeaderService {
  public elementRef?: ElementRef;

  public get offsetHeight(): number {
    return this.elementRef ? this.elementRef.nativeElement.offsetHeight : 0;
  }
}
