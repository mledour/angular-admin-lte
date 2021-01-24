import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import type { QueryList } from '@angular/core';
import {NavigationEnd, PRIMARY_OUTLET, Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {RoutingService} from '../../services/routing.service';
import {WrapperService} from '../wrapper/wrapper.service';
import {HeaderService} from '../header/header.service';
import {LayoutStore} from '../layout.store';
import {AnimationEvent} from '../../animations/animations.interface';
import {removeListeners, removeSubscriptions} from '../../helpers';
import {SidebarLeftToggleDirective} from './sidebar-left.directive';


export interface Item {
  id: number;
  parentId: number;
  label: string;
  route?: string;
  iconClasses?: string;
  children?: Array<Item>;
  isActive?: boolean;
  isCollapsed?: boolean;
  disableCollapse?: boolean;
}


export type Items = Item[];


@Component({
  selector: 'mk-layout-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarLeftComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidebarElement', { static: true }) public sidebarElement!: ElementRef;

  @ViewChildren(SidebarLeftToggleDirective) public sidebarLeftToggleDirectives!: QueryList<SidebarLeftToggleDirective>;

  public menu?: Items;
  public sidebarHeight?: number;
  public sidebarOverflow?: string;

  private layout!: string;
  private isSidebarLeftCollapsed!: boolean;
  private isSidebarLeftExpandOnOver!: boolean;
  private isSidebarLeftMouseOver = false;
  private windowInnerWidth?: number;
  private windowInnerHeight?: number;
  private collapsedItems: Items = [];
  private activatedItems: Items = [];
  private toggleListeners: Array<() => void> = [];
  private listeners: Array<() => void> = [];
  private itemsByIds: {[propKey: number]: Item} = {};
  private runningAnimations = 0;
  private subscriptions: Subscription[] = [];
  private activeUrl!: string;
  private initialized = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private layoutStore: LayoutStore,
    private ngZone: NgZone,
    private renderer2: Renderer2,
    private router: Router,
    private routingService: RoutingService,
    private wrapperService: WrapperService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.layoutStore.sidebarLeftMenu.subscribe(value => {
      this.menu = value;
      this.monkeyPatchMenu(this.menu);
      if (this.initialized) {
        this.setMenuListeners(this.activeUrl);
        this.setSidebarListeners();
        this.setMenuTogglesListeners();
      }
      this.initialized = true;
    }));
    this.subscriptions.push(this.layoutStore.sidebarLeftMenuActiveUrl.subscribe(value => {
      this.activeUrl = value;
      this.setMenuListeners(value);
    }));
    this.subscriptions.push(this.routingService.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeUrl = event.url;
        this.setMenuListeners(event.url);
      }
    }));

    this.setSidebarListeners();
  }

  ngAfterViewInit(): void {
    this.setMenuTogglesListeners();
    this.checkMenuWithoutChildren();
  }

  ngOnDestroy(): void {
    this.subscriptions = removeSubscriptions(this.subscriptions);
    this.listeners = removeListeners(this.listeners);
    this.toggleListeners = removeListeners(this.toggleListeners);
  }

  setSidebarListeners(): void {
    this.subscriptions.push(this.layoutStore.layout.subscribe((value: string) => {
      this.layout = value;
      this.setSidebarHeight();
    }));

    this.subscriptions.push(this.layoutStore.windowInnerHeight.subscribe(value => {
      this.windowInnerHeight = value;
      this.setSidebarHeight();
    }));

    this.subscriptions.push(this.layoutStore.sidebarLeftMenu.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    }));

    this.ngZone.runOutsideAngular(() => {
      this.listeners.push(this.renderer2.listen(this.sidebarElement.nativeElement, 'mouseenter', () => {
        this.layoutStore.sidebarLeftMouseOver(true);
      }));
      this.listeners.push(this.renderer2.listen(this.sidebarElement.nativeElement, 'mouseleave', () => {
        this.layoutStore.sidebarLeftMouseOver(false);
      }));
    });

    this.subscriptions.push(this.layoutStore.windowInnerWidth.subscribe(value => {
      this.windowInnerWidth = value;
      if (!this.isSidebarLeftCollapsed && this.windowInnerWidth && this.windowInnerWidth <= 767) {
        this.layoutStore.sidebarLeftCollapsed(true);
      } else if (this.windowInnerWidth && this.windowInnerWidth > 767 && this.isSidebarLeftCollapsed && !this.isSidebarLeftExpandOnOver) {
        this.layoutStore.sidebarLeftCollapsed(false);
      }
    }));

    this.subscriptions.push(this.layoutStore.isSidebarLeftMouseOver.subscribe((value: boolean) => {
      this.isSidebarLeftMouseOver = value;
      if (this.isSidebarLeftExpandOnOver) {
        this.layoutStore.sidebarLeftCollapsed(!value);
      }
    }));

    this.subscriptions.push(this.layoutStore.isSidebarLeftExpandOnOver.subscribe((value: boolean) => {
      this.isSidebarLeftExpandOnOver = value;
      if (this.windowInnerWidth && this.windowInnerWidth > 767 && this.isSidebarLeftCollapsed !== undefined) {
        this.layoutStore.sidebarLeftCollapsed(value);
      }
    }));

    this.subscriptions.push(this.layoutStore.isSidebarLeftCollapsed.subscribe((value: boolean) => {
      this.isSidebarLeftCollapsed = value;

      if (this.windowInnerWidth && this.windowInnerWidth <= 767) {
        if (value) {
          this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-open');
        } else {
          this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-open');
        }
      } else {
        if (this.isSidebarLeftExpandOnOver && !this.isSidebarLeftMouseOver && !value) {
          this.layoutStore.sidebarLeftExpandOnOver(false);
        }
        if (value) {
          this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-collapse');
          if (this.isSidebarLeftExpandOnOver) {
            this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-expanded-on-hover');
          }
        } else {
          this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-collapse');
          if (this.isSidebarLeftExpandOnOver) {
            this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-expanded-on-hover');
          }
        }
      }
    }));

    this.subscriptions.push(this.layoutStore.isSidebarLeftMini.subscribe((value: boolean) => {
      if (value) {
        this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-mini');
      } else {
        this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-mini');
      }
    }));
  }

  public getIconClasses(item: Item): string {
    if (item.iconClasses || item.iconClasses === '') {
      return item.iconClasses;
    } else {
      return 'fa fa-circle-o';
    }
  }

  public visibilityStateStart(event: AnimationEvent): void {
    this.runningAnimations ++;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.runningAnimations --;
        if (!this.runningAnimations) {
          this.layoutStore.setSidebarLeftElementHeight(this.sidebarElement.nativeElement.offsetHeight);
        }
      }, event.totalTime);
    });
  }

  private setMenuListeners(url: string): void {
    if (url === '/') {
      this.activeItems(url);
      this.changeDetectorRef.detectChanges();
    } else {
      const primaryOutlet = this.router.parseUrl(url).root.children[PRIMARY_OUTLET];
      if (primaryOutlet) {
        this.activeItems(primaryOutlet.toString());
        this.changeDetectorRef.detectChanges();
      }
    }

    if (this.windowInnerWidth && this.windowInnerWidth <= 767 || this.isSidebarLeftExpandOnOver) {
      this.layoutStore.sidebarLeftCollapsed(true);
    }
  }

  private uncollapseItemParents(item: Item, isActive = false): void {
    if (isActive) {
      item.isActive = true;
      this.activatedItems.push(item);
    }
    item.isCollapsed = false;
    this.collapsedItems.push(item);
    if (item.parentId) {
      this.uncollapseItemParents(this.itemsByIds[item.parentId], isActive);
    }
  }

  private findItemsByUrl(url: string, items: Items, returnItems: Items = []): Items {
    items.forEach((item: Item) => {
      if (item.route === url) {
        returnItems.push(item);
      } else if (item.children) {
        this.findItemsByUrl(url, item.children, returnItems);
      }
    });
    return returnItems;
  }

  private activeItems(url: string): void {
    if (!this.menu) {
      return;
    }

    this.activatedItems.forEach((item: Item) => {
      item.isActive = false;
    });
    this.activatedItems = [];

    this.collapsedItems.forEach((item: Item) => {
      item.isActive = false;
      item.isCollapsed = true;
    });
    this.collapsedItems = [];

    const items = this.findItemsByUrl(url, this.menu);
    items.forEach(item => {
      item.isActive = true;
      this.uncollapseItemParents(item, true);
      this.activatedItems.push(item);
    });
  }

  private monkeyPatchMenu(items: Items, parentId?: number): void {
    items.forEach((item: Item, index: number) => {
      item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
      if (parentId) {
        item.parentId = parentId;
      }
      if (!item.disableCollapse) {
        item.isCollapsed = true;
      }
      item.isActive = false;
      if (parentId || item.children) {
        this.itemsByIds[item.id] = item;
      }
      if (item.children) {
        this.monkeyPatchMenu(item.children, item.id);
      }
    });
  }

  private setMenuTogglesListeners(): void {
    this.toggleListeners = removeListeners(this.toggleListeners);
    this.ngZone.runOutsideAngular(() => {
      this.sidebarLeftToggleDirectives.forEach((menuToggle: SidebarLeftToggleDirective) => {
        this.toggleListeners.push(this.renderer2.listen(menuToggle.elementRef.nativeElement, 'click', (event) => {
          event.preventDefault();
          if (menuToggle.item.isCollapsed) {
            this.collapsedItems.forEach((item: Item) => {
              if (!item.disableCollapse) {
                item.isCollapsed = true;
              }
            });
            this.collapsedItems = [];
            this.uncollapseItemParents(menuToggle.item);
          } else {
            menuToggle.item.isCollapsed = !menuToggle.item.isCollapsed;
          }
          this.changeDetectorRef.detectChanges();
        }));
      });
    });
  }

  private checkMenuWithoutChildren(): void {
    if (!this.menu) {
      return;
    }

    let menuHaveChildren;
    this.menu.forEach(item => {
      if (item.children) {
        menuHaveChildren = true;
      }
    });
    if (!menuHaveChildren) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.layoutStore.setSidebarLeftElementHeight(this.sidebarElement.nativeElement.offsetHeight);
        });
      });
    }
  }

  private setSidebarHeight(): void {
    if (this.layout === 'fixed' && this.windowInnerHeight) {
      const height = this.windowInnerHeight - this.headerService.offsetHeight;
      if (height && height !== this.sidebarHeight) {
        this.sidebarHeight = height;
        this.sidebarOverflow = 'auto';
        this.changeDetectorRef.detectChanges();
      }
    } else if (this.sidebarHeight) {
      this.sidebarOverflow = this.sidebarHeight = undefined;
      this.changeDetectorRef.detectChanges();
    }
  }
}
