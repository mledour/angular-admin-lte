import { Directive, Input, Renderer2, ElementRef } from '@angular/core';

import { colors, colorsAliases } from './color.definition';

@Directive({
  selector: '[mkColor]'
})
export class BackgroundColorDirective {
  private currentStyle: any;
  private currentClass: any;

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) {}

  @Input('mkColorCondition') condition = true;
  @Input('mkColorPrefix') prefix: string;
  @Input('mkColorProperty') property: string;
  @Input('mkColor') set color(color: string) {
    if(color && this.condition) {
      this.reset();
      if(colors[color]) {
        this.renderer2.addClass(this.elementRef.nativeElement, 'bg-color');
        this.currentStyle = {property: this.property, color: colors[color]};
        this.renderer2.setStyle(this.elementRef.nativeElement, this.property, colors[color]);
      } else {
        this.renderer2.removeClass(this.elementRef.nativeElement, 'bg-color');
        if(color.startsWith('#') || color.startsWith('rgb')) {
          this.currentStyle = {property: this.property, color: color};
          this.renderer2.setStyle(this.elementRef.nativeElement, this.property, color);
        } else if(colorsAliases.indexOf(color) !== -1) {
          this.currentClass = `${this.prefix}-${color}`;
          this.renderer2.addClass(this.elementRef.nativeElement, this.currentClass);
        }
      }
    }
  }

  private reset() {
    if(this.currentStyle) {
      this.renderer2.removeStyle(this.elementRef.nativeElement, this.currentStyle.property, this.currentStyle.color);
    } else if(this.currentClass) {
      this.renderer2.removeClass(this.elementRef.nativeElement, this.currentClass);
    }
  }
}

@Directive({
  selector: '[mkFontColor]'
})
export class ColorDirective {
  private currentStyle: any;
  private currentClass: any;

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) {}

  @Input('mkFontColor') set color(color: string) {
    if(color) {
      this.reset();
      if(color.startsWith('#') || color.startsWith('rgb')) {
        this.currentStyle = color;
        this.renderer2.setStyle(this.elementRef.nativeElement, 'color', color);
      } else {
        this.currentClass = `text-${color}`;
        this.renderer2.addClass(this.elementRef.nativeElement, this.currentClass);
      }
    }
  }

  private reset() {
    if(this.currentStyle) {
      this.renderer2.removeStyle(this.elementRef.nativeElement, 'color', this.currentStyle);
    } else if(this.currentClass) {
      this.renderer2.removeClass(this.elementRef.nativeElement, this.currentClass);
    }
  }
}
