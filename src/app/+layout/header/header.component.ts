import { Component, AfterViewInit } from '@angular/core';

declare var Prism;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AfterViewInit {
  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
