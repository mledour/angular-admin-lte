import { Component, ContentChild, Input, ViewChild, TemplateRef, ElementRef, AfterViewInit, OnDestroy, NgZone, Renderer2 } from '@angular/core';

import { LayoutStore } from '../layout.store';

import { HeaderService } from './header.service';

import { removeSubscriptions, removeListeners } from '../../helpers';

/**
 * Header Logo
 */
@Component({
  selector: 'mk-layout-header-logo',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class HeaderLogoComponent {
  @ViewChild('templateRef') public templateRef: TemplateRef<any>;
}

/**
 * Header Logo Mini
 */
@Component({
  selector: 'mk-layout-header-logo-mini',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class HeaderLogoMiniComponent {
  @ViewChild('templateRef') public templateRef: TemplateRef<any>;
}

/**
 * Header
 */
@Component({
  selector: 'mk-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private isSidebarLeftCollapsed: boolean;
  private isSidebarRightCollapsed: boolean;
  private listeners = [];
  private subscriptions = [];

  @Input() isSidebarLeftToggle = true;
  @Input() isSidebarRightToggle = true;

  @ContentChild(HeaderLogoComponent) public headerLogoComponent: HeaderLogoComponent;
  @ContentChild(HeaderLogoMiniComponent) public headerLogoMiniComponent: HeaderLogoMiniComponent;

  @ViewChild('headerElement') private headerElement: ElementRef;
  @ViewChild('sidebarLeftToggleElement') private sidebarLeftToggleElement: ElementRef;
  @ViewChild('sidebarRightToggleElement') private sidebarRightToggleElement: ElementRef;

  /**
   * @method constructor
   * @param  {LayoutStore} privatelayoutStore [description]
   * @param  {NgZone}      privatengZone      [description]
   * @param  {Renderer2}   privaterenderer2   [description]
   */
  constructor(
    private layoutStore: LayoutStore,
    private ngZone: NgZone,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private headerService: HeaderService
  ) {}

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    this.headerService.elementRef = this.headerElement;

    if(this.sidebarLeftToggleElement) {
      this.subscriptions.push(this.layoutStore.isSidebarLeftCollapsed.subscribe((value: boolean) => {
        this.isSidebarLeftCollapsed = value;
      }));
      this.ngZone.runOutsideAngular(() => {
        this.listeners.push(this.renderer2.listen(this.sidebarLeftToggleElement.nativeElement, 'click', (event: Event) => {
          event.preventDefault();
          this.layoutStore.sidebarLeftCollapsed(!this.isSidebarLeftCollapsed);
        }));
      });
    }
    if(this.sidebarRightToggleElement) {
      this.subscriptions.push(this.layoutStore.isSidebarRightCollapsed.subscribe((value: boolean) => {
        this.isSidebarRightCollapsed = value;
      }));
      this.ngZone.runOutsideAngular(() => {
        this.listeners.push(this.renderer2.listen(this.sidebarRightToggleElement.nativeElement, 'click', (event: Event) => {
          event.preventDefault();
          this.layoutStore.sidebarRightCollapsed(!this.isSidebarRightCollapsed);
        }));
      });
    }
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    this.listeners = removeListeners(this.listeners);
    this.subscriptions = removeSubscriptions(this.subscriptions);
  }
}
