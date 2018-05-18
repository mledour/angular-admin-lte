import { Component, AfterViewInit } from '@angular/core';

declare var Prism;

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html'
})
export class SidebarRightComponent implements AfterViewInit {
  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
