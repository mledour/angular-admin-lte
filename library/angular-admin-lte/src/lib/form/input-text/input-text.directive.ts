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
  private defaultClass = 'form-control';
  private isSetClass: boolean;
  private _onKeyUp = new Subject<NgControl>();

  public onKeyup: Observable<NgControl> = this._onKeyUp.asObservable();

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

  /**
   * @method constructor
   * @param  elementRef   [description]
   * @param  renderer2    [description]
   * @param  ngControl    [description]
   * @param  colorService [description]
   * @param  classService [description]
   */
  constructor(
    public elementRef: ElementRef,
    public renderer2: Renderer2,
    private ngControl: NgControl,
    private colorService: ColorService,
    private classService: ClassService
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    if (!this.isSetClass) {
      this.classService.applyClasses(this.defaultClass);
    }
  }

  @HostListener('keyup') keyUpListener() {
    this._onKeyUp.next(this.ngControl);
  }
}
