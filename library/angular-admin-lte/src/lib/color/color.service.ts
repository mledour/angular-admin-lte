import { Injectable, Renderer2, ElementRef } from '@angular/core';

import { colors, colorsAliases } from './color.definition';

/*
 *
 */
@Injectable()
export class ColorService {
  private currentBackgroundStyle: any;
  private currentBackgroundClass: any;
  private currentFontStyle: any;
  private currentFontClass: any;

  /**
   * @method constructor
   * @param renderer2 [description]
   * @param elementRef [description]
   */
  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {
    // this.init();
    // console.log(this);
  }

  /**
   * [setBackgroundColor description]
   * @method setBackgroundColor
   * @param  color              [description]
   * @param  condition          [description]
   * @param  property           [description]
   * @param  prefix             [description]
   */
  public setBackgroundColor(color: string, condition: boolean, property: string, prefix: string): void {
    if (color && condition) {
      this.resetBackgroundColor();
      if (colors[color]) {
        this.renderer2.addClass(this.elementRef.nativeElement, 'bg-color');
        this.currentBackgroundStyle = {property: property, color: colors[color]};
        this.renderer2.setStyle(this.elementRef.nativeElement, property, colors[color]);
      } else {
        this.renderer2.removeClass(this.elementRef.nativeElement, 'bg-color');
        if (color.indexOf('#') === 0 || color.indexOf('rgb') === 0) {
          this.currentBackgroundStyle = {property: property, color: color};
          this.renderer2.setStyle(this.elementRef.nativeElement, property, color);
        } else if (colorsAliases.indexOf(color) !== -1) {
          this.currentBackgroundClass = prefix ? `${prefix}-${color}` : color;
          this.renderer2.addClass(this.elementRef.nativeElement, this.currentBackgroundClass);
        }
      }
    }
  }

  /**
   * [resetBackgroundColor description]
   * @method resetBackgroundColor
   */
  public resetBackgroundColor(): void {
    if (this.currentBackgroundStyle) {
      this.renderer2.removeStyle(this.elementRef.nativeElement, this.currentBackgroundStyle.property, this.currentBackgroundStyle.color);
    } else if (this.currentBackgroundClass) {
      this.renderer2.removeClass(this.elementRef.nativeElement, this.currentBackgroundClass);
    }
  }

  /**
   * [setFontColor description]
   * @method setFontColor
   * @param  color        [description]
   */
  public setFontColor(color: string): void {
    if (color) {
      this.resetFontColor();
      if (color.startsWith('#') || color.startsWith('rgb')) {
        this.currentFontStyle = color;
        this.renderer2.setStyle(this.elementRef.nativeElement, 'color', color);
      } else {
        this.currentFontClass = `text-${color}`;
        this.renderer2.addClass(this.elementRef.nativeElement, this.currentFontClass);
      }
    }
  }

  /**
   * [resetFontColor description]
   * @method resetFontColor
   * @return [description]
   */
  public resetFontColor() {
    if (this.currentFontStyle) {
      this.renderer2.removeStyle(this.elementRef.nativeElement, 'color', this.currentFontStyle);
    } else if (this.currentFontClass) {
      this.renderer2.removeClass(this.elementRef.nativeElement, this.currentFontClass);
    }
  }
}
