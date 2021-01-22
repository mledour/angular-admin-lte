import { Directive, Input, Renderer2, ElementRef, OnInit, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

import { Observable, Subject } from 'rxjs';

import { ColorService } from '../../color/color.service';
import { ClassService } from '../../services/class.service';

// @TODO onFocus Color

@Directive({
  selector: '[mkInputText]',
  providers: [ColorService, ClassService]
})
export class InputTextDirective implements OnInit {
  @Input() set borderColor(color: string) {
    this.colorService.setBackgroundColor(color, true, 'border-color', '');
  }
  @Input() set class(className: string) {
    this.isSetClass = true;
    this.classService.applyClasses(className);
  }
  @Input() set color(color: string) {
    this.colorService.setFontColor(color);
  }

  private defaultClass = 'form-control';
  private isSetClass = false;
  private onKeyUp = new Subject<NgControl>();

  public onKeyup: Observable<NgControl> = this.onKeyUp.asObservable();

  @HostListener('keyup') keyUpListener(): void {
    this.onKeyUp.next(this.ngControl);
  }

  constructor(
    public elementRef: ElementRef,
    public renderer2: Renderer2,
    private ngControl: NgControl,
    private colorService: ColorService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    if (!this.isSetClass) {
      this.classService.applyClasses(this.defaultClass);
    }
  }
}
