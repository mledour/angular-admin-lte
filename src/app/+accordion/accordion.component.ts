import {Component, AfterViewInit, NgZone, ChangeDetectorRef, ViewRef} from '@angular/core';

import * as Prism from 'prismjs';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements AfterViewInit {
  public activeIndex: any = 0;

  /**
   *
   * @param {NgZone} ngZone
   * @param {ChangeDetectorRef} changeDetectorRef
   */
  constructor(
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.activeIndex = [1, 2, 3];
        if (! (this.changeDetectorRef as ViewRef).destroyed) {
          this.changeDetectorRef.detectChanges();
        }
      }, 500);
    });

  }
}
