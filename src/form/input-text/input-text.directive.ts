import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';

import { ColorService } from '../../color/color.service';

//@TODO create a service for managing class and styles dynamically
//@TODO onFocus Color


@Directive({
  selector: '[mkInputText]',
  providers: [ColorService]
})
export class InputTextDirective implements OnInit {
  private className = 'form-control';

  @Input() set borderColor(color: string) {
    this.colorService.setBackgroundColor(color, true, 'border-color', null);
  }
  @Input() set class(className: string) {
    if(className === undefined) {
      className = this.className;
    }
  }
  @Input() set color(color: string) {
    this.colorService.setFontColor(color);
  }
  @Input() value: any;

  constructor(
    public elementRef: ElementRef,
    public renderer2: Renderer2,
    private colorService: ColorService
  ) {}


  ngOnInit() {
    this.applyClassName();
  }

  applyClassName() {
    this.renderer2.addClass(this.elementRef.nativeElement, this.className);
  }
}
