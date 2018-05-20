import { Component, AfterViewInit } from '@angular/core';

import * as Prism from 'prismjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements AfterViewInit {
  /**
   * @method AfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }

}
