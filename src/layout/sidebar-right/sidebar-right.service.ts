import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class SidebarRightService {
  public elementRef: ElementRef;

  /**
   * [offsetHeight description]
   * @method offsetHeight
   * @return [description]
   */
  get offsetHeight(): number {
    return this.elementRef ? this.elementRef.nativeElement.offsetHeight: null;
  }

  /**
   * [scrollHeight description]
   * @method scrollHeight
   * @return [description]
   */
  get scrollHeight(): number {
    return this.elementRef ? this.elementRef.nativeElement.scrollHeight: null;
  }
}
