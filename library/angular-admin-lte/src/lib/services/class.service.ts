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
    if (typeof cssClasses === 'string') {
      cssClasses = cssClasses.split(' ');
    }

    // Remove only classes that are not in cssClasses
    const classesToRemove = this.currentClasses.filter(x => cssClasses.indexOf(x) === -1);
    classesToRemove.forEach(cssClasse => {
      if (cssClasse) {
        this.renderer2.removeClass(this.elementRef.nativeElement, cssClasse);
      }
    });

    // Add only classes that are not in currentClasses
    const classesToAdd = cssClasses.filter(x => this.currentClasses.indexOf(x) === -1);
    classesToAdd.forEach(cssClasse => {
      if (cssClasse) {
        this.renderer2.addClass(this.elementRef.nativeElement, cssClasse);
      }
    });

    // Update current classes for futur updates
    this.currentClasses = [... cssClasses];
  }
}
