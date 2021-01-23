import { Component, OnInit, Renderer2, ElementRef, NgZone, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { throttle, removeSubscriptions, removeListeners } from '../../helpers';
import { LayoutStore } from '../layout.store';
import { WrapperService } from './wrapper.service';


@Component({
  selector: 'mk-layout-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit, OnDestroy {
  private skin?: string;
  private listeners: (() => void)[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private layoutStore: LayoutStore,
    private wrapperService: WrapperService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.layoutStore.setWindowInnerHeight(window.innerHeight);
    this.layoutStore.setWindowInnerWidth(window.innerWidth);

    this.wrapperService.wrapperElementRef = this.elementRef;

    this.ngZone.runOutsideAngular(() => {
      this.listeners.push(this.renderer2.listen('window', 'resize', throttle(() => {
        this.layoutStore.setWindowInnerHeight(window.innerHeight);
        this.layoutStore.setWindowInnerWidth(window.innerWidth);
      }, 250)));
    });

    this.subscriptions.push(this.layoutStore.layout.subscribe(value => {
      value === 'fixed' ? this.renderer2.addClass(this.elementRef.nativeElement, 'fixed') :
        this.renderer2.removeClass(this.elementRef.nativeElement, 'fixed');
      value === 'boxed' ? this.renderer2.addClass(this.elementRef.nativeElement, 'layout-boxed') :
        this.renderer2.removeClass(this.elementRef.nativeElement, 'layout-boxed');
    }));

    this.subscriptions.push(this.layoutStore.skin.subscribe(value => {
      if (this.skin && this.skin !== value) {
        this.renderer2.removeClass(this.elementRef.nativeElement, `skin-${this.skin}`);
      }

      this.skin = value;
      this.renderer2.addClass(this.elementRef.nativeElement, `skin-${this.skin}`);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions = removeSubscriptions(this.subscriptions);
    this.listeners = removeListeners(this.listeners);
  }
}
