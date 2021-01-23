import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

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
  @ViewChild('contentInnerElement', { static: true }) private contentInnerElement!: ElementRef;

  public description?: string;
  public header?: string;
  public heightStyle?: number;
  public sidebarLeftHeight?: number;
  public windowInnerHeight?: number;

  private layout?: string;
  private titleTag?: string;
  private navigationEnd = false;
  private subscriptions: Subscription[] = [];

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

  ngOnInit(): void {
    this.titleTag = this.titleService.getTitle();

    this.subscriptions.push(this.routingService.onChange.subscribe(value => {
      if (value && value[value.length - 1] && value[value.length - 1].data) {
        const data = value[value.length - 1].data as any;

        this.titleService.setTitle(this.getTitle(data.title) || '');
        this.header = data.title;
        this.description = data.description;
      }
      this.changeDetectorRef.markForCheck();
    }));

    this.subscriptions.push(this.router.events.subscribe(routeEvent => {
      if (routeEvent instanceof NavigationStart) {
        this.navigationEnd = false;
      }
      if (routeEvent instanceof NavigationEnd) {
        this.navigationEnd = true;
        this.setContentMinHeight();
      }
    }));

    this.subscriptions.push(this.layoutStore.sidebarLeftElementHeight.subscribe(value => {
      this.sidebarLeftHeight = value;
      this.setContentMinHeight();
    }));

    this.subscriptions.push(this.layoutStore.layout.subscribe(value => {
      this.layout = value;
      this.setContentMinHeight();
    }));

    this.subscriptions.push(this.layoutStore.windowInnerHeight.subscribe(value => {
      this.windowInnerHeight = value;
      this.setContentMinHeight();
    }));
    this.heightStyle = this.windowInnerHeight;
  }

  ngOnDestroy(): void {
    this.subscriptions = removeSubscriptions(this.subscriptions);
  }

  public get scrollHeight(): number {
    return this.contentInnerElement.nativeElement.scrollHeight;
  }

  private getTitle(title: string): string | undefined {
    return title ? `${title} - ${this.titleTag}` : this.titleTag;
  }

  private setContentMinHeight(): void {
    if (this.navigationEnd) {
      let heightStyle = 0;

      const headerFooterOffsetHeight = this.headerService.offsetHeight + this.footerService.offsetHeight;

      if (this.layout === 'fixed' && this.windowInnerHeight) {
        heightStyle = this.windowInnerHeight - this.footerService.offsetHeight;
      } else if (this.windowInnerHeight && this.sidebarLeftHeight) {
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
          heightStyle = 0;
        }
        this.heightStyle = heightStyle;
        this.changeDetectorRef.detectChanges();
      }
    }
  }
}
