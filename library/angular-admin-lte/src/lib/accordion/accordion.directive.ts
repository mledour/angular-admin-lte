import { Directive, Input, ElementRef } from '@angular/core';

/*
 *
 */
@Directive({
  selector: '[mkAccordionToggle]'
})
export class AccordionToggleDirective {
  @Input('mkAccordionToggle') accordionComponent;

  /**
   * @method constructor
   * @param elementRef [description]
   */
  constructor(
    public elementRef: ElementRef
  ) {}
}
