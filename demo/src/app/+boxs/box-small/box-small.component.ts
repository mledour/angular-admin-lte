import { Component, AfterViewInit } from '@angular/core';

import { RouterLink } from '@angular/router'

declare var Prism;

@Component({
  selector: 'app-box-small',
  templateUrl: './box-small.component.html',
  styleUrls: ['./box-small.component.css']
})
export class BoxSmallComponent implements AfterViewInit {

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
