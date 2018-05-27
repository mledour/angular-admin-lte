import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';

import {WrapperService} from '../wrapper/wrapper.service';
import {LayoutStore} from '../layout.store';
import {SidebarRightService} from './sidebar-right.service';
import {removeListeners, removeSubscriptions} from '../../helpers';

@Component({
  selector: 'mk-layout-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SidebarRightComponent implements OnInit, AfterViewInit, OnDestroy {
  public layout: string;

  private skin: string;
  private isSidebarRightOverContent: boolean;
  private isSidebarRightCollapsed: boolean;
  private listeners = [];
  private subscriptions = [];

  @ViewChild('sidebarContentElement') public sidebarContentElement: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private layoutStore: LayoutStore,
    private sidebarRightService: SidebarRightService,
    private wrapperService: WrapperService
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    this.renderer2.addClass(this.elementRef.nativeElement, 'control-sidebar');

    this.subscriptions.push(this.layoutStore.isSidebarRightCollapsed.subscribe(value => {
      this.isSidebarRightCollapsed = value;
      if (!value) {
        this.renderer2.addClass(this.elementRef.nativeElement, 'control-sidebar-open');
        if (!this.isSidebarRightOverContent) {
          this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'control-sidebar-open');
        }
      } else {
        this.renderer2.removeClass(this.elementRef.nativeElement, 'control-sidebar-open');
        if (!this.isSidebarRightOverContent) {
          this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'control-sidebar-open');
        }
      }
    }));

    this.subscriptions.push(this.layoutStore.isSidebarRightOverContent.subscribe((value: boolean) => {
      this.isSidebarRightOverContent = value;
      if (!this.isSidebarRightCollapsed) {
        if (value) {
          this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'control-sidebar-open');
        } else {
          this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'control-sidebar-open');
        }
      }
    }));

    this.subscriptions.push(this.layoutStore.sidebarRightSkin.subscribe((value: string) => {
      if (this.skin !== value) {
        this.renderer2.removeClass(this.elementRef.nativeElement, `control-sidebar-${this.skin}`);
      }
      this.skin = value;
      this.renderer2.addClass(this.elementRef.nativeElement, `control-sidebar-${value}`);
    }));
  }

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    this.sidebarRightService.elementRef = this.sidebarContentElement;
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    this.listeners = removeListeners(this.listeners);
    this.subscriptions = removeSubscriptions(this.subscriptions);
  }
}
