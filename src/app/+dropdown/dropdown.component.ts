import { Component, AfterViewInit } from '@angular/core';

import * as Prism from 'prismjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements AfterViewInit {

  /**
   *
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
