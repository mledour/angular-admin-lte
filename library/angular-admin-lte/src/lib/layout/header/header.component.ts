import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';
import type { TemplateRef } from '@angular/core';

import { Subscription } from 'rxjs';

import {LayoutStore} from '../layout.store';
import {HeaderService} from './header.service';
import {removeListeners, removeSubscriptions} from '../../helpers';


@Component({
  selector: 'mk-layout-header-logo',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class HeaderLogoComponent {
  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;
}


@Component({
  selector: 'mk-layout-header-logo-mini',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class HeaderLogoMiniComponent {
  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;
}


@Component({
  selector: 'mk-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @Input() isSidebarLeftToggle = true;
  @Input() sidebarLeftToggleIconClasses?: string;
  @Input() isSidebarRightToggle = true;
  @Input() sidebarRightToggleIconClasses?: string;
  @Input() logoLink: string | any[] = '/';

  @ContentChild(HeaderLogoComponent) public headerLogoComponent?: HeaderLogoComponent;
  @ContentChild(HeaderLogoMiniComponent) public headerLogoMiniComponent?: HeaderLogoMiniComponent;

  @ViewChild('headerElement', { static: true }) private headerElement!: ElementRef;
  @ViewChild('sidebarLeftToggleElement') private sidebarLeftToggleElement?: ElementRef;
  @ViewChild('sidebarRightToggleElement') private sidebarRightToggleElement?: ElementRef;

  private isSidebarLeftCollapsed?: boolean;
  private isSidebarRightCollapsed?: boolean;
  private listeners: (() => void)[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private layoutStore: LayoutStore,
    private ngZone: NgZone,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private headerService: HeaderService
  ) {}

  ngAfterViewInit(): void {
    this.headerService.elementRef = this.headerElement;

    if (this.sidebarLeftToggleElement) {
      this.subscriptions.push(this.layoutStore.isSidebarLeftCollapsed.subscribe(value => {
        this.isSidebarLeftCollapsed = value;
      }));
      this.ngZone.runOutsideAngular(() => {
        this.listeners.push(this.renderer2.listen(this.sidebarLeftToggleElement?.nativeElement, 'click', event => {
          event.preventDefault();
          this.layoutStore.sidebarLeftCollapsed(!this.isSidebarLeftCollapsed);
        }));
      });
    }
    if (this.sidebarRightToggleElement) {
      this.subscriptions.push(this.layoutStore.isSidebarRightCollapsed.subscribe(value => {
        this.isSidebarRightCollapsed = value;
      }));
      this.ngZone.runOutsideAngular(() => {
        this.listeners.push(this.renderer2.listen(this.sidebarRightToggleElement?.nativeElement, 'click', event => {
          event.preventDefault();
          this.layoutStore.sidebarRightCollapsed(!this.isSidebarRightCollapsed);
        }));
      });
    }
  }

  ngOnDestroy(): void {
    this.listeners = removeListeners(this.listeners);
    this.subscriptions = removeSubscriptions(this.subscriptions);
  }
}
