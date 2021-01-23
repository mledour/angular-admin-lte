import { Directive, Input, ElementRef } from '@angular/core';

import { Item } from './sidebar-left.component';


@Directive({
  selector: '[mkMenuToggle]'
})
export class SidebarLeftToggleDirective {
  // TODO: Add @Required decorator
  @Input('mkMenuToggle') item!: Item;

  constructor(
    public elementRef: ElementRef
  ) {}
}
