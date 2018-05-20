import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import * as Prism from 'prismjs';

@Component({
  templateUrl: './box-default.component.html',
  styleUrls: ['./box-default.component.css']
})
export class BoxDefaultComponent implements AfterViewInit {

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
