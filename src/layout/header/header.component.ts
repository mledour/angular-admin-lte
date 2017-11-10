import { Component, ContentChild, ViewChild, TemplateRef, ElementRef, OnInit, NgZone, Renderer2 } from '@angular/core';

import { LayoutStore } from '../layout.store';

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
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  private isSidebarLeftCollapsed: boolean;

  @ContentChild(HeaderLogoComponent) public headerLogoComponent: HeaderLogoComponent;
  @ContentChild(HeaderLogoMiniComponent) public headerLogoMiniComponent: HeaderLogoMiniComponent;

  @ViewChild('sidebarToggleElement') private sidebarToggleElement: ElementRef;

  constructor(
    private layoutStore: LayoutStore,
    private ngZone: NgZone,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {
    this.layoutStore.isSidebarLeftCollapsed.subscribe((value: boolean) => {
      this.isSidebarLeftCollapsed = value;
    });

    this.ngZone.runOutsideAngular(() => {
      this.renderer2.listen(this.sidebarToggleElement.nativeElement, 'click', (event: Event) => {
        event.preventDefault();
        this.layoutStore.sidebarLeftCollapsed(!this.isSidebarLeftCollapsed);
      });
    });
  }
}
