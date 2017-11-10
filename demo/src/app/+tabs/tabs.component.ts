import { Component, OnInit, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';

declare var Prism;

@Component({
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterViewInit {
  public toggleDropdown = true;
  public toggleDropdown2 = true;

  public toto;

  constructor(private ngZone:NgZone, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    /*this.toto = [
      {header: 'toto 1', text: 'toto text 1'},
      {header: 'toto 2', text: 'toto text 2'}
    ];*/
  }

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
    /*this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.toto = [...this.toto, {header: 'toto 3', text: 'toto text 3'}];
        this.changeDetectorRef.detectChanges();
      }, 1000);
    });*/
  }
}
