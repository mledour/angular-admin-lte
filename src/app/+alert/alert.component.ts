import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var Prism;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements AfterViewInit {
  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
