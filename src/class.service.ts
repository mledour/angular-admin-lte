import { Injectable, Renderer2, ElementRef } from '@angular/core';

/*
 *
 */
@Injectable()
export class ClassService {
  private currentClasses: Array<string> = [];

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) {}


  public applyClasses(cssClasses: string | Array<string>): void {
    if(typeof cssClasses === 'string') {
      cssClasses = cssClasses.split(' ');
    }

    // Remove only classes that are not in cssClasses
    let classesToRemove = this.currentClasses.filter(x => !cssClasses.includes(x));
    classesToRemove.forEach(cssClass => {
      if(cssClass) {
        this.renderer2.removeClass(this.elementRef.nativeElement, cssClass);
      }
    });

    // Add only classes that are not in currentClasses
    let classesToAdd = cssClasses.filter(x => !this.currentClasses.includes(x));
    classesToAdd.forEach(cssClass => {
      if(cssClass) {
        this.renderer2.addClass(this.elementRef.nativeElement, cssClass);
      }
    });

    // Update current classes for futur updates
    this.currentClasses = [... cssClasses];
  }
}
