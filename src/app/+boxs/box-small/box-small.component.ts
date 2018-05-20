import { Component, AfterViewInit } from '@angular/core';

import * as Prism from 'prismjs';

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
