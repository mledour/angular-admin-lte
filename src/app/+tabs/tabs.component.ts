import { Component, AfterViewInit } from '@angular/core';

import * as Prism from 'prismjs';

@Component({
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterViewInit {
  public toggleDropdown = true;
  public toggleDropdown2 = true;

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
