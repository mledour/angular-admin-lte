import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';

import { ColorService } from '../../color/color.service';
import { ClassService } from '../../class.service';

//@TODO create a service for managing class and styles dynamically
//@TODO onFocus Color


@Directive({
  selector: '[mkInputText]',
  providers: [ColorService, ClassService]
})
export class InputTextDirective implements OnInit {
  private defaultClass = 'form-control';
  private isSetClass: boolean;

  @Input() set borderColor(color: string) {
    this.colorService.setBackgroundColor(color, true, 'border-color', null);
  }
  @Input() set class(className: string) {
    this.isSetClass = true;
    this.classService.applyClasses(className);
  }
  @Input() set color(color: string) {
    this.colorService.setFontColor(color);
  }
  @Input() value: any;

  constructor(
    public elementRef: ElementRef,
    public renderer2: Renderer2,
    private colorService: ColorService,
    private classService: ClassService
  ) {}

  ngOnInit() {
    if(!this.isSetClass) {
      this.classService.applyClasses(this.defaultClass);
    }
  }
}
