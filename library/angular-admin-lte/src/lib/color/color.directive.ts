import { Directive, Input, Renderer2, ElementRef } from '@angular/core';

import { ColorService } from './color.service';
import { Colors } from './color.definition';


@Directive({
  selector: '[mkColor]',
  providers: [ColorService]
})
export class BackgroundColorDirective {
  // TODO: ADD @Required decorator
  @Input('mkColorCondition') condition = true;
  @Input('mkColorPrefix') set setPrefix(prefix: string) {
    this.prefix = prefix;
    this.colorService.setBackgroundColor(this.color, this.condition, this.property, this.prefix);
  }
  @Input('mkColorProperty') property!: string;
  @Input('mkColor') set setColor(color: Colors | string | undefined) {
    if (color) {
      this.color = color;
      this.colorService.setBackgroundColor(this.color, this.condition, this.property, this.prefix);
    }
  }

  private prefix!: string;
  private color!: Colors | string;

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private colorService: ColorService
  ) {}
}


@Directive({
  selector: '[mkFontColor]',
  providers: [ColorService]
})
export class ColorDirective {
  @Input('mkFontColor') set color(color: string | undefined) {
    this.colorService.setFontColor(color);
  }

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private colorService: ColorService
  ) {}
}
