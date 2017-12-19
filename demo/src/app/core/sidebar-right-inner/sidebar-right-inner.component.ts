import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { LayoutStore } from '../../../../../src/layout/layout.store';

@Component({
  selector: 'app-sidebar-right-inner',
  templateUrl: './sidebar-right-inner.component.html'
})
export class SidebarRightInnerComponent implements OnInit {

  public layout: string;
  public isSidebarLeftCollapsed: boolean;
  public isSidebarLeftExpandOnOver: boolean;
  public isSidebarLeftMini: boolean;

  constructor(
    public layoutStore: LayoutStore,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * [ngOnInit description]
   * @method ngOnInit
   */
  ngOnInit() {
    this.layoutStore.isSidebarLeftCollapsed.subscribe((value: boolean) => {
      this.isSidebarLeftCollapsed = value;
      this.changeDetectorRef.detectChanges();
    });
    this.layoutStore.isSidebarLeftExpandOnOver.subscribe((value: boolean) => {
      this.isSidebarLeftExpandOnOver = value;
      this.changeDetectorRef.detectChanges();
    });
    this.layoutStore.isSidebarLeftMini.subscribe((value: boolean) => {
      this.isSidebarLeftMini = value;
      this.changeDetectorRef.detectChanges();
    });
  }

  /**
   * [onLayoutChange description]
   * @method onLayoutChange
   * @param  {[type]}       event [description]
   */
  public onLayoutChange(event): void {
    this.layout = event.target.checked ? event.target.getAttribute('value') : '';
    this.layoutStore.setLayout(this.layout);
  }

  /**
   * [changeSkin description]
   * @method changeSkin
   * @param  {[type]}   event [description]
   * @param  {string}   color [description]
   */
  public changeSkin(event, color: string): void {
    event.preventDefault();
    this.layoutStore.setSkin(color);
  }

  /**
   * [changeSidebarRightSkin description]
   * @method changeSidebarRightSkin
   * @param  {boolean}              value [description]
   */
  public changeSidebarRightSkin(value: boolean): void {
    if(value) {
      this.layoutStore.setSidebarRightSkin('light');
    } else {
      this.layoutStore.setSidebarRightSkin('dark');
    }
  }

}
