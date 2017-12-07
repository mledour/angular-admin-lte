import { Component, Directive, ElementRef, TemplateRef, forwardRef, Input, NgZone, OnInit, Renderer2, ViewChild, ContentChild, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputTextAddonLeftDirective, InputTextAddonRightDirective } from './input-text.directive';

/*
 *
 */
@Component({
  selector: 'mk-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextComponent),
    multi: true
  }]
})
export class InputTextComponent implements ControlValueAccessor, OnInit {
  @Input() value: number | string;

  private listener: Function;
  private onChange: Function;
  private onTouched: Function;

  @Input() addonLeft: string;
  @Input() addonLeftIcon: string;
  @Input() addonRight: string;
  @Input() addonRightIcon: string;
  @Input() id: string | number = new Date().valueOf();
  @Input() isDisabled: boolean;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() size: string;
  @Input() wrapperClasses = 'form-group';

  @ViewChild('inputElement') inputElement: ElementRef;

  @ContentChild(InputTextAddonLeftDirective) public inputTextAddonLeftDirective: InputTextAddonLeftDirective;
  @ContentChild(InputTextAddonRightDirective) public inputTextAddonRightDirective: InputTextAddonRightDirective;

  /**
   * @method constructor
   * @param  {Renderer2} privaterenderer2 [description]
   * @param  {NgZone}    privatengZone    [description]
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private renderer2: Renderer2,
    private ngZone: NgZone
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    //this.ngZone.runOutsideAngular(() => {
      this.listener = this.renderer2.listen(this.inputElement.nativeElement, 'input', (event: Event) => {
        this.onChange((<HTMLInputElement>event.target).value);
        this.changeDetectorRef.detectChanges();
      });
      this.renderer2.listen(this.inputElement.nativeElement, 'blur', (event: Event) => {
        this.onTouched();
        this.changeDetectorRef.detectChanges();
      });
    //});
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    if(this.listener) {
      this.listener();
    }
  }

  /**
   * [registerOnChange description]
   * @method registerOnChange
   * @param  {Function}       fn [description]
   */
  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  /**
   * [registerOnTouched description]
   * @method registerOnTouched
   * @param  {Function}        fn [description]
   */
  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  /**
   * [setDisabledState description]
   * @method setDisabledState
   * @param  {boolean}        isDisabled [description]
   */
  setDisabledState(isDisabled: boolean): void {
    this.renderer2.setProperty(this.inputElement.nativeElement, 'disabled', isDisabled);
  }

  /**
   * [writeValue description]
   * @method writeValue
   * @param  {any} value [description]
   */
  writeValue(value: any): void {
    if(value) {
      this.value = value;
    }
  }
}
