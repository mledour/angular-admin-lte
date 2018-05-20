import { Component, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';

declare var Prism;

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements AfterViewInit {
  public activeIndex: any = 0;

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
        this.activeIndex = [1,2,3];
        this.changeDetectorRef.detectChanges();
      }, 500);
    });

  }
}
