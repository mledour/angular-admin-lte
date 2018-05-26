import { Component, OnInit, Renderer2, ElementRef, NgZone, OnDestroy } from '@angular/core';

import { throttle, removeSubscriptions, removeListeners } from '../../helpers';
import { LayoutStore } from '../layout.store';
import { WrapperService } from './wrapper.service';

@Component({
  selector: 'mk-layout-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit, OnDestroy {
  private skin: string;
  private listeners = [];
  private subscriptions = [];

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

    this.subscriptions.push(this.layoutStore.wrapperClasses.subscribe((value: string) => {
      this.classes = value ? value : null;
    }));

    this.ngZone.runOutsideAngular(() => {
      this.listeners.push(this.renderer2.listen('window', 'resize', throttle(() => {
        this.layoutStore.setWindowInnerHeight(window.innerHeight);
        this.layoutStore.setWindowInnerWidth(window.innerWidth);
      }, 250)));
    });

    this.subscriptions.push(this.layoutStore.layout.subscribe((value: string) => {
      value === 'fixed' ? this.renderer2.addClass(this.elementRef.nativeElement, 'fixed') :
        this.renderer2.removeClass(this.elementRef.nativeElement, 'fixed');
      value === 'boxed' ? this.renderer2.addClass(this.elementRef.nativeElement, 'layout-boxed') :
        this.renderer2.removeClass(this.elementRef.nativeElement, 'layout-boxed');
    }));

    this.subscriptions.push(this.layoutStore.skin.subscribe((value: string) => {
      if (value) {
        if (this.skin && this.skin !== value) {
          this.renderer2.removeClass(this.elementRef.nativeElement, `skin-${this.skin}`);
        }
        this.skin = value;
        this.renderer2.addClass(this.elementRef.nativeElement, `skin-${this.skin}`);
      }
    }));
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    this.subscriptions = removeSubscriptions(this.subscriptions);
    this.listeners = removeListeners(this.listeners);
  }
}
