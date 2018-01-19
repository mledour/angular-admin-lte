import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public isLayoutDisabled: boolean;

  constructor(
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.layoutService.isLayoutDisabled.subscribe((value: boolean) => {
      this.isLayoutDisabled = value;
    });
  }
}
