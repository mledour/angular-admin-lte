import { Component, OnInit, AfterContentInit, Input, ViewChild, Renderer2, ElementRef, NgZone, ChangeDetectionStrategy } from '@angular/core';

import { WrapperService } from '../wrapper/wrapper.service';

import { LayoutStore } from '../layout.store';

@Component({
  selector: 'mk-layout-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SidebarRightComponent implements OnInit, AfterContentInit {
  public layout: string;

  private skin: string;
  private windowInnerHeight: number;
  private isSidebarRightOverContent: boolean;
  private isSidebarRightCollapsed: boolean;

  @ViewChild('sidebarElement') public sidebarElement: Element;

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private layoutStore: LayoutStore,
    private NgZone: NgZone,
    private wrapperService: WrapperService
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    this.renderer2.addClass(this.elementRef.nativeElement, 'control-sidebar');

    this.layoutStore.isSidebarRightCollapsed.subscribe(value => {
      this.isSidebarRightCollapsed = value;
      if(!value) {
        this.renderer2.addClass(this.elementRef.nativeElement, 'control-sidebar-open');
        if(!this.isSidebarRightOverContent) {
          this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'control-sidebar-open');
        }
      } else {
        this.renderer2.removeClass(this.elementRef.nativeElement, 'control-sidebar-open');
        if(!this.isSidebarRightOverContent) {
          this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'control-sidebar-open');
        }
      }
    });

    this.layoutStore.isSidebarRightOverContent.subscribe((value: boolean) => {
      this.isSidebarRightOverContent = value;
      if(!this.isSidebarRightCollapsed) {
        if(value) {
          this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'control-sidebar-open');
        } else {
          this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'control-sidebar-open');
        }
      }
    });

    this.layoutStore.sidebarRightSkin.subscribe((value: string) => {
      if(this.skin !== value) {
        this.renderer2.removeClass(this.elementRef.nativeElement, `control-sidebar-${this.skin}`);
      }
      this.skin = value;
      this.renderer2.addClass(this.elementRef.nativeElement, `control-sidebar-${value}`);
    });

    this.layoutStore.layout.subscribe(value => {
      this.layout = value;
    });

    this.layoutStore.windowInnerHeight.subscribe((value: number) => {
      this.windowInnerHeight = value;
      if(this.layout === 'fixed') {
        this.renderer2.setStyle(this.elementRef.nativeElement, 'height', `${value}px`);
      }
    });
  }

  /**
   * [ngAfterViewInit description]
   * @method ngAfterViewInit
   */
  ngAfterContentInit() {
    this.NgZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.layoutStore.setSidebarRightElementHeight(this.elementRef.nativeElement.offsetHeight);
      });
    });
  }
}
