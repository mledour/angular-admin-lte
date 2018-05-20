import { Component, AfterViewInit } from '@angular/core';

declare var Prism;

@Component({
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterViewInit {
  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
