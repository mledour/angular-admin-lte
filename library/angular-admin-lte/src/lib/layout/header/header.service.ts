import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class HeaderService {
  public elementRef: ElementRef;

  /**
   * [offsetHeight description]
   * @method offsetHeight
   * @return [description]
   */
  public get offsetHeight(): number {
    return this.elementRef.nativeElement.offsetHeight;
  }
}
