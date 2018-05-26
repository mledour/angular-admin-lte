import { Injectable, Renderer2, ElementRef } from '@angular/core';

/*
 *
 */
@Injectable()
export class StyleService {
  private currentStyles = [];

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) {}


  public applyStyles(styles: Array<any>): void {
    styles.forEach(style => {
      this.applyStyle(style.style, style.value);
    });
  }


  public applyStyle(style: string, value: any): void {
    if (style && value) {
      this.resetStyles();
      this.currentStyles.push(style);
      this.renderer2.setStyle(this.elementRef.nativeElement, style, value);
    }
  }

  public resetStyles(): void {
    this.currentStyles.forEach(style => {
      this.renderer2.removeStyle(this.elementRef, style);
    });
  }
}
