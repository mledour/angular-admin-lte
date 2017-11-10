import { Component, AfterViewInit } from '@angular/core';

declare var Prism;

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements AfterViewInit {
  constructor() { }

  ngAfterViewInit() {
    Prism.highlightAll();
  }

}
