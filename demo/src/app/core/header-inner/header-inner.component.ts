import { Component, OnInit, Renderer2, NgZone, ViewChild, ElementRef } from '@angular/core';

import { LayoutStore } from '../../src/layout/layout.store';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})
export class HeaderInnerComponent implements OnInit {
  private isSidebarRightCollapsed: boolean;

  @ViewChild('sidebarRightClickElement') private sidebarRightClickElement: ElementRef;

  /**
   * @method constructor
   * @param  {LayoutStore} private layoutStore [description]
   * @param  {Renderer2}   private rendrer2    [description]
   * @param  {NgZone}      private ngZone      [description]
   */
  constructor(
    private layoutStore: LayoutStore,
    private renderer2: Renderer2,
    private ngZone: NgZone
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    this.layoutStore.isSidebarRightCollapsed.subscribe((value: boolean) =>  {
      this.isSidebarRightCollapsed = value;
    });
    this.renderer2.listen(this.sidebarRightClickElement.nativeElement, 'click', (event: Event) => {
      event.preventDefault();
      this.layoutStore.sidebarRightCollapsed(!this.isSidebarRightCollapsed);
    });
  }
}
