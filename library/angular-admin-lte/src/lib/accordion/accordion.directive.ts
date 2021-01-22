import { Directive, Input, ElementRef } from '@angular/core';
import { AccordionComponent } from './accordion.component';


@Directive({
  selector: '[mkAccordionToggle]'
})
export class AccordionToggleDirective {
  // TODO: Add @Required decorator
  @Input('mkAccordionToggle') accordionComponent!: AccordionComponent;

  constructor(
    public elementRef: ElementRef
  ) {}
}
