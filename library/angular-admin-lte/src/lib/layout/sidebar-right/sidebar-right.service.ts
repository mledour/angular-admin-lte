import { Injectable, ElementRef } from '@angular/core';


@Injectable()
export class SidebarRightService {
  public elementRef?: ElementRef;

  get scrollHeight(): number {
    return this.elementRef ? this.elementRef.nativeElement.scrollHeight : 0;
  }
}
