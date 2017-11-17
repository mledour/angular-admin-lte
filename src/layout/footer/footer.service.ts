import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class FooterService {
  public elementRef: ElementRef;

  /**
   * [offsetHeight description]
   * @method offsetHeight
   * @return {number}     [description]
   */
  public get offsetHeight(): number {
    return this.elementRef.nativeElement.offsetHeight;
  }
}
