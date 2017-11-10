import { Directive, Input, ElementRef } from '@angular/core';

/*
 *
 */
@Directive({
  selector: '[mkTabToggle]'
})
export class TabToggleDirective {
  @Input('mkTabToggle') tabComponent;

  /**
   * @method constructor
   * @param  {ElementRef} elementRef [description]
   */
  constructor(
    public elementRef: ElementRef
  ) {}
}
