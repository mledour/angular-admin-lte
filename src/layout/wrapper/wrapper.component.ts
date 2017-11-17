import { Component, OnInit, Input, Renderer2, ElementRef, NgZone } from '@angular/core';

import { throttle } from '../../helpers';
import { LayoutStore } from '../layout.store';
import { WrapperService } from './wrapper.service';

@Component({
  selector: 'mk-layout-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  private skin: string;
  private layout: string;
  private sidebarLeftElementHeight: number;

  public classes: string;

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private layoutStore: LayoutStore,
    private wrapperService: WrapperService,
    private ngZone: NgZone
  ) {}

  /**
   * [ngOnInit description]
   * @method ngOnInit
   */
  ngOnInit() {
    this.layoutStore.setWindowInnerHeight(window.innerHeight);
    this.layoutStore.setWindowInnerWidth(window.innerWidth);

    this.wrapperService.wrapperElementRef = this.elementRef;

    this.layoutStore.wrapperClasses.subscribe((value: string) => {
      this.classes = value ? value : null;
    });

    this.ngZone.runOutsideAngular(() => {
      this.renderer2.listen('window', 'resize', throttle(() => {
        this.layoutStore.setWindowInnerHeight(window.innerHeight);
        this.layoutStore.setWindowInnerWidth(window.innerWidth);
      }, 250));
    });

    this.layoutStore.layout.subscribe((value: string) => {
      value === 'fixed' ? this.renderer2.addClass(this.elementRef.nativeElement, 'fixed') : this.renderer2.removeClass(this.elementRef.nativeElement, 'fixed');
      value === 'boxed' ? this.renderer2.addClass(this.elementRef.nativeElement, 'layout-boxed') : this.renderer2.removeClass(this.elementRef.nativeElement, 'layout-boxed');
    });

    this.layoutStore.skin.subscribe((value: string) => {
      if(value) {
        if(this.skin && this.skin !== value){
          this.renderer2.removeClass(this.elementRef.nativeElement, `skin-${this.skin}`);
        }
        this.skin = value;
        this.renderer2.addClass(this.elementRef.nativeElement, `skin-${this.skin}`);
      }
    });
  }
}
