import { Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LayoutStore } from '../layout.store';

import { RoutingService } from '../../routing.service';

@Component({
  selector: 'mk-layout-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit, AfterViewInit {
  public description: string;
  public header: string;
  public heightStyle: number;
  public sidebarLeftHeight: number;
  public sidebarRightHeight: number;
  public windowInnerHeight: number

  private layout: string;
  private titleTag: string;

  /**
   * @method constructor
   * @param  {LayoutStore}    privatelayoutStore    [description]
   * @param  {LayoutService}  privatelayoutService  [description]
   * @param  {RoutingService} privateroutingService [description]
   * @param  {Title}          privatetitleService   [description]
   */
  constructor(
    private layoutStore: LayoutStore,
    private routingService: RoutingService,
    private titleService: Title,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    this.titleTag = this.titleService.getTitle();

    this.routingService.onChange.subscribe((value: any) => {
      if(value && value[value.length - 1]) {
        this.titleService.setTitle(this.getTitle(value[value.length - 1].data['title']));
        this.header = value[value.length - 1].data['title'];
        this.description = value[value.length - 1].data['description'];
      }
      this.changeDetectorRef.markForCheck();
    });
  }

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    this.layoutStore.sidebarLeftElementHeight.subscribe((value: number) => {
      this.sidebarLeftHeight = value;
      this.setMinHeight();
    });

    this.layoutStore.sidebarRightElementHeight.subscribe((value: number) => {
      this.sidebarRightHeight = value;
      this.setMinHeight();
    });

    this.layoutStore.layout.subscribe((value: string) => {
      this.layout = value;
      this.setMinHeight();
    });

    this.layoutStore.windowInnerHeight.subscribe((value: number) => {
      this.windowInnerHeight = value;
      this.setMinHeight();
    });
  }

  /**
   * [getTitle description]
   * @method getTitle
   * @param  {string} title [description]
   * @return {string}       [description]
   */
  private getTitle(title: string): string {
    return title ? `${title} - ${this.titleTag}` : this.titleTag;
  }

  /**
   * [setMinHeight description]
   * @method setMinHeight
   */
  private setMinHeight(): void {
    if(this.layout && this.sidebarLeftHeight) {
      let sidebarRightHeight = this.layout === 'fixed' ? 0 : (this.sidebarRightHeight ? this.sidebarRightHeight : 0);
      let windowInnerHeight = this.windowInnerHeight ? this.windowInnerHeight : window.innerHeight;

      windowInnerHeight = this.layout === 'fixed' ? windowInnerHeight -51 : windowInnerHeight - 101;
      this.heightStyle = Math.max(windowInnerHeight, this.sidebarLeftHeight - 50, sidebarRightHeight - 101);
      this.changeDetectorRef.detectChanges();
    }
  }
}
