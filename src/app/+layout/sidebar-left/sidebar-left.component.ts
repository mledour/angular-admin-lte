import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import * as Prism from 'prismjs';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html'
})
export class SidebarLeftComponent implements AfterViewInit {
  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
