import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class SidebarRightService {
  public elementRef: ElementRef;

  /**
   * [scrollHeight description]
   * @method scrollHeight
   * @return [description]
   */
  get scrollHeight(): number {
    return this.elementRef ? this.elementRef.nativeElement.scrollHeight : null;
  }
}
