import { Directive, Input, ElementRef } from '@angular/core';
import { TabComponent } from './tabs.component';


@Directive({
  selector: '[mkTabToggle]'
})
export class TabToggleDirective {
  // TODO: Add @Required decorator
  @Input('mkTabToggle') tabComponent!: TabComponent;

  constructor(
    public elementRef: ElementRef
  ) {}
}
