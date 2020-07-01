import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

import {Subscriber} from 'rxjs';

import {LayoutStore} from 'angular-admin-lte';

@Component({
  selector: 'app-sidebar-right-inner',
  templateUrl: './sidebar-right-inner.component.html'
})
export class SidebarRightInnerComponent implements OnInit, OnDestroy {

  public layout: string;
  public isSidebarLeftCollapsed: boolean;
  public isSidebarLeftExpandOnOver: boolean;
  public isSidebarLeftMini: boolean;

  private subscriptions = [];

  constructor(
    public layoutStore: LayoutStore,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * [ngOnInit description]
   * @method ngOnInit
   */
  ngOnInit() {
    this.subscriptions.push(this.layoutStore.isSidebarLeftCollapsed.subscribe((value: boolean) => {
      this.isSidebarLeftCollapsed = value;
      this.changeDetectorRef.detectChanges();
    }));
    this.subscriptions.push(this.layoutStore.isSidebarLeftExpandOnOver.subscribe((value: boolean) => {
      this.isSidebarLeftExpandOnOver = value;
      this.changeDetectorRef.detectChanges();
    }));
    this.subscriptions.push(this.layoutStore.isSidebarLeftMini.subscribe((value: boolean) => {
      this.isSidebarLeftMini = value;
      this.changeDetectorRef.detectChanges();
    }));
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    this.removeSubscriptions();
  }

  /**
   * [removeListeners description]
   * @method removeListeners
   */
  private removeSubscriptions(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((subscription: Subscriber<any>) => {
        subscription.unsubscribe();
      });
    }
    this.subscriptions = [];
  }


  /**
   * [onLayoutChange description]
   * @method onLayoutChange
   */
  public onLayoutChange(event): void {
    this.layout = event.target.checked ? event.target.getAttribute('value') : '';
    this.layoutStore.setLayout(this.layout);
  }

  /**
   * [changeSkin description]
   * @method changeSkin
   */
  public changeSkin(event, color: string): void {
    event.preventDefault();
    this.layoutStore.setSkin(color);
  }

  /**
   * [changeSidebarRightSkin description]
   * @method changeSidebarRightSkin
   */
  public changeSidebarRightSkin(value: boolean): void {
    if (value) {
      this.layoutStore.setSidebarRightSkin('light');
    } else {
      this.layoutStore.setSidebarRightSkin('dark');
    }
  }
}
