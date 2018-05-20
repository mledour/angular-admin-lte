import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { LayoutStore } from '../layout.store';

import { RoutingService } from '../../services/routing.service';
import { SidebarRightService } from '../sidebar-right/sidebar-right.service';
import { HeaderService } from '../header/header.service';
import { FooterService } from '../footer/footer.service';

import { removeSubscriptions } from '../../helpers';

@Component({
  selector: 'mk-layout-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit, OnDestroy {
  public description: string;
  public header: string;
  public heightStyle: number;
  public sidebarLeftHeight: number;
  public windowInnerHeight: number;

  private layout: string;
  private titleTag: string;
  private navigationEnd: boolean;
  private subscriptions = [];

  @ViewChild('contentInnerElement') private contentInnerElement: ElementRef;

  /**
   * @method constructor
   * @param layoutStore
   * @param routingService
   * @param titleService
   * @param elementRef
   * @param changeDetectorRef
   * @param sidebarRightService
   * @param headerService
   * @param footerService
   * @param router
   */
  constructor(
    private layoutStore: LayoutStore,
    private routingService: RoutingService,
    private titleService: Title,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private sidebarRightService: SidebarRightService,
    private headerService: HeaderService,
    private footerService: FooterService,
    private router: Router
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    this.titleTag = this.titleService.getTitle();

    this.subscriptions.push(this.routingService.onChange.subscribe((value: any) => {
      if (value && value[value.length - 1]) {
        this.titleService.setTitle(this.getTitle(value[value.length - 1].data['title']));
        this.header = value[value.length - 1].data['title'];
        this.description = value[value.length - 1].data['description'];
      }
      this.changeDetectorRef.markForCheck();
    }));

    this.subscriptions.push(this.router.events.subscribe((routeEvent: RouterEvent) => {
      if (routeEvent instanceof NavigationStart) {
        this.navigationEnd = false;
      }
      if (routeEvent instanceof NavigationEnd) {
        this.navigationEnd = true;
        this.setContentMinHeight();
      }
    }));

    this.subscriptions.push(this.layoutStore.sidebarLeftElementHeight.subscribe((value: number) => {
      this.sidebarLeftHeight = value;
      this.setContentMinHeight();
    }));

    this.subscriptions.push(this.layoutStore.layout.subscribe((value: string) => {
      this.layout = value;
      this.setContentMinHeight();
    }));

    this.subscriptions.push(this.layoutStore.windowInnerHeight.subscribe((value: number) => {
      this.windowInnerHeight = value;
      this.setContentMinHeight();
    }));
    this.heightStyle = this.windowInnerHeight;
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    this.subscriptions = removeSubscriptions(this.subscriptions);
  }

  /**
   * [scrollHeight description]
   * @method scrollHeight
   * @return [description]
   */
  public get scrollHeight(): number {
    return this.contentInnerElement.nativeElement.scrollHeight;
  }

  /**
   * [getTitle description]
   * @method getTitle
   * @param title [description]
   * @return [description]
   */
  private getTitle(title: string): string {
    return title ? `${title} - ${this.titleTag}` : this.titleTag;
  }

  /**
   * [setMinHeight description]
   * @method setMinHeight
   */
  private setContentMinHeight(): void {
    if (this.navigationEnd) {
      let heightStyle;

      const headerFooterOffsetHeight = this.headerService.offsetHeight + this.footerService.offsetHeight;

      if (this.layout === 'fixed') {
        heightStyle = this.windowInnerHeight - this.footerService.offsetHeight;
      } else {
        const sidebarRight =
          this.sidebarRightService.scrollHeight ?
            this.sidebarRightService.scrollHeight - this.headerService.offsetHeight : 0;

        heightStyle = Math.max(
          this.windowInnerHeight - headerFooterOffsetHeight,
          this.sidebarLeftHeight - this.headerService.offsetHeight,
          sidebarRight
        );
      }

      if (heightStyle && heightStyle !== this.heightStyle) {
        if (this.scrollHeight > heightStyle) {
          heightStyle = null;
        }
        this.heightStyle = heightStyle;
        this.changeDetectorRef.detectChanges();
      }
    }
  }
}
