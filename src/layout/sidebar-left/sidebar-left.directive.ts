import { Directive, Input, ElementRef } from '@angular/core';

/*
 *
 */
@Directive({
  selector: '[mkMenuToggle]'
})
export class SidebarLeftToggleDirective {
  @Input('mkMenuToggle') item;

  /**
   * @method constructor
   * @param  {ElementRef} elementRef [description]
   */
  constructor(
    public elementRef: ElementRef
  ) {}
}
