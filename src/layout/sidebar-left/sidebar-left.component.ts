import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { NavigationStart, PRIMARY_OUTLET, Router, Event as RouterEvent } from '@angular/router';

import { WrapperService } from '../wrapper/wrapper.service';
import { HeaderService } from '../header/header.service';

import { LayoutStore } from '../layout.store';

import { AnimationEvent } from '../../animations/animations.interface';

import { SidebarLeftToggleDirective } from './sidebar-left.directive';

export interface Item {
  id: number;
  parentId: number;
  label: string;
  route?: string;
  iconClasses?: string;
  children?: Array<Item>;
  isActive?: boolean;
  isCollapsed?: boolean;
}

export type Items = Array<Item>;

@Component({
  selector: 'mk-layout-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarLeftComponent implements OnInit, AfterViewInit {
  public menu: Array<any>;
  public sidebarStyles: any;
  public sidebarHeight: number;
  public sidebarOverflow: string;

  private layout: string;
  private isSidebarLeftCollapsed: boolean;
  private isSidebarLeftExpandOnOver: boolean;
  private isSidebarLeftMouseOver: boolean;
  private windowInnerWidth: number;
  private windowInnerHeight: number;
  private collapsedItems: Items = [];
  private activatedItems: Items = [];
  private toggleListeners: Array<Function>;
  private itemsByIds: {[propKey: number]: Item} = {};
  private runningAnimations = 0;

  @ViewChild('sidebarElement') public sidebarElement: ElementRef;

  @ViewChildren(SidebarLeftToggleDirective) public sidebarLeftToggleDirectives: QueryList<SidebarLeftToggleDirective>;

  /**
   * @method constructor
   * @param  {ChangeDetectorRef} privatechangeDetectorRef [description]
   * @param  {LayoutStore}       privatelayoutStore       [description]
   * @param  {LayoutService}     privatelayoutService     [description]
   * @param  {NgZone}            privatengZone            [description]
   * @param  {Renderer2}         privaterenderer2         [description]
   * @param  {Router}            privaterouter            [description]
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private layoutStore: LayoutStore,
    private ngZone: NgZone,
    private renderer2: Renderer2,
    private router: Router,
    private wrapperService: WrapperService,
    private headerService: HeaderService
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    this.setMenuListeners();
    this.setSidebarListeners();
  }

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    this.setMenuTogglesListeners();
    this.checkMenuWithoutChildren();
  }

  /**
   * [setSidebarListeners description]
   * @method setSidebarListeners
   */
  setSidebarListeners(): void {
    this.layoutStore.layout.subscribe((value: string) => {
      this.layout = value;
      this.setSidebarHeight();
    });

    this.layoutStore.windowInnerHeight.subscribe((value: number) => {
      this.windowInnerHeight = value;
      this.setSidebarHeight();
    });

    this.layoutStore.sidebarLeftMenu.subscribe((value: Array<any>) => {
      this.changeDetectorRef.detectChanges();
    });

    this.ngZone.runOutsideAngular(() => {
      this.renderer2.listen(this.sidebarElement.nativeElement, 'mouseenter', (event: Event) => {
        this.layoutStore.sidebarLeftMouseOver(true);
      });
      this.renderer2.listen(this.sidebarElement.nativeElement, 'mouseleave', (event: Event) => {
        this.layoutStore.sidebarLeftMouseOver(false);
      });
    });

    this.layoutStore.windowInnerWidth.subscribe((value: number) => {
      this.windowInnerWidth = value;
      if(!this.isSidebarLeftCollapsed && this.windowInnerWidth <= 767) {
        this.layoutStore.sidebarLeftCollapsed(true);
      } else if(this.windowInnerWidth > 767 && this.isSidebarLeftCollapsed && !this.isSidebarLeftExpandOnOver) {
        this.layoutStore.sidebarLeftCollapsed(false);
      }
    });

    this.layoutStore.isSidebarLeftMouseOver.subscribe((value: boolean) => {
      this.isSidebarLeftMouseOver = value;
      if(this.isSidebarLeftExpandOnOver) {
        this.layoutStore.sidebarLeftCollapsed(!value);
      }
    });

    this.layoutStore.isSidebarLeftExpandOnOver.subscribe((value: boolean) => {
      this.isSidebarLeftExpandOnOver = value;
      if(this.windowInnerWidth > 767) {
        this.layoutStore.sidebarLeftCollapsed(value);
      }
    });

    this.layoutStore.isSidebarLeftCollapsed.subscribe((value: boolean) => {
      if(this.windowInnerWidth <= 767) {
        if(value) {
          this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-open');
        } else {
          this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-open');
        }
      } else {
        if(this.isSidebarLeftExpandOnOver && !this.isSidebarLeftMouseOver && !value) {
          this.layoutStore.sidebarLeftExpandOnOver(false);
        }
        if(value) {
          this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-collapse');
          if(this.isSidebarLeftExpandOnOver) {
            this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-expanded-on-hover');
          }
        } else {
          this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-collapse');
          if(this.isSidebarLeftExpandOnOver) {
            this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-expanded-on-hover');
          }
        }
      }
    });

    this.layoutStore.isSidebarLeftMini.subscribe((value: boolean) => {
      if(value) {
        this.renderer2.addClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-mini');
      } else {
        this.renderer2.removeClass(this.wrapperService.wrapperElementRef.nativeElement, 'sidebar-mini');
      }
    });
  }

  /**
   * [setMenuListeners description]
   * @method setMenuListeners
   * @return {[type]}         [description]
   */
  setMenuListeners() {
    this.router.events.subscribe((event: RouterEvent) => {
      if(event instanceof NavigationStart) {
        if(event.url === '/') {
          this.activeItems(event.url);
          this.changeDetectorRef.detectChanges();
        } else {
          let primaryOutlet = this.router.parseUrl(event.url).root.children[PRIMARY_OUTLET];
          if(primaryOutlet) {
            this.activeItems(primaryOutlet.toString());
            this.changeDetectorRef.detectChanges();
          }
        }
        if(this.windowInnerWidth <= 767 || this.isSidebarLeftExpandOnOver) {
          this.layoutStore.sidebarLeftCollapsed(true);
        }
      }
    });

    this.layoutStore.sidebarLeftMenu.subscribe(value => {
      this.menu = value;
      this.monkeyPatchMenu(this.menu);
    });
  }

  /**
   * [getIconClasses description]
   * @method getIconClasses
   * @param  {[type]}       item [description]
   * @return {string}            [description]
   */
  public getIconClasses(item: Item): string {
    if(item.iconClasses || item.iconClasses === '') {
      return item.iconClasses;
    } else {
      return 'fa fa-circle-o';
    }
  }

  /**
   * [visibilityStateStart description]
   * @method visibilityStateStart
   * @param  {AnimationEvent}     event [description]
   */
  public visibilityStateStart(event: AnimationEvent): void {
    this.runningAnimations ++;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.runningAnimations --;
        if(!this.runningAnimations) {
          this.layoutStore.setSidebarLeftElementHeight(this.sidebarElement.nativeElement.offsetHeight);
        }
      }, event.totalTime);
    });
  }

  /**
   * [uncollapseItemParents description]
   * @method uncollapseItemParents
   * @param  {Item}                item           [description]
   * @param  {Boolean}             isActive       [description]
   */
  private uncollapseItemParents(item: Item, isActive = false): void {
    if(isActive) {
      item.isActive = true;
    }
    item.isCollapsed = false;
    this.collapsedItems.push(item);
    if(item.parentId) {
      this.uncollapseItemParents(this.itemsByIds[item.parentId], isActive);
    }
  }

  /**
   * [findItemsByUrl description]
   * @method findItemsByUrl
   * @param  {string}         url   [description]
   * @param  {Items}          items [description]
   * @param  {Items}          returnItems [description]
   * @return {Items}          [description]
   */
  private findItemsByUrl(url: string, items: Items, returnItems: Items = []): Items {
    items.forEach((item: Item) => {
      if(item.route === url) {
        returnItems.push(item);
      } else if (item.children) {
        this.findItemsByUrl(url, item.children, returnItems)
      }
    });
    return returnItems;
  }

  /**
   * [activeItems description]
   * @method activeItems
   * @param  {string}    url [description]
   */
  private activeItems(url: string): void {
    this.activatedItems.forEach((item: Item) => {
      item.isActive = false;
    });
    this.activatedItems = [];

    this.collapsedItems.forEach((item: Item) => {
      item.isActive = false;
      item.isCollapsed = true;
    });
    this.collapsedItems = [];

    let items = this.findItemsByUrl(url, this.menu);
    items.forEach(item => {
      item.isActive = true;
      this.uncollapseItemParents(item, true);
      this.activatedItems.push(item);
    });
  }

  /**
   * [monkeyPatchMenu description]
   * @method monkeyPatchMenu
   * @param  {Items}         items    [description]
   * @param  {number}        parentId [description]
   */
  private monkeyPatchMenu(items: Items, parentId?: number): void {
    items.forEach((item: Item, index: number) => {
      item.id = parentId ? Number(parentId + '' + index) : index;
      if(parentId) {
        item.parentId = parentId;
      }
      item.isCollapsed = true;
      item.isActive = false;
      if(parentId || item.children) {
        this.itemsByIds[item.id] = item;
      }
      if(item.children) {
        this.monkeyPatchMenu(item.children, item.id);
      }
    });
  }

  /**
   * [removeListeners description]
   * @method removeListeners
   */
  private removeListeners(): void {
    if(this.toggleListeners) {
      this.toggleListeners.forEach((listener: Function) => {
        listener();
      });
    }
    this.toggleListeners = [];
  }

  /**
   * [setMenuTogglesListeners description]
   * @method setMenuTogglesListeners
   */
  private setMenuTogglesListeners(): void {
    this.ngZone.runOutsideAngular(() => {
      this.removeListeners();
      this.sidebarLeftToggleDirectives.forEach((menuToggle: SidebarLeftToggleDirective) => {
        this.toggleListeners.push(this.renderer2.listen(menuToggle.elementRef.nativeElement, 'click', (event) => {
          event.preventDefault();
          if(menuToggle.item.isCollapsed) {
            this.collapsedItems.forEach((item: Item) => {
              item.isCollapsed = true;
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

  /**
   * [checkMenuWithoutChildren description]
   * @method checkMenuWithoutChildren
   */
  private checkMenuWithoutChildren(): void {
    let menuHaveChildren;
    this.menu.forEach((item: Item) => {
      if(item.children) {
        return menuHaveChildren = true;
      }
    });
    if(!menuHaveChildren) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.layoutStore.setSidebarLeftElementHeight(this.sidebarElement.nativeElement.offsetHeight);
        });
      });
    }
  }

  /**
   * [setSidebarHeight description]
   * @method setSidebarHeight
   */
  private setSidebarHeight(): void {
    if(this.layout === 'fixed') {
      let height = this.windowInnerHeight - this.headerService.offsetHeight;
      if(height && height !== this.sidebarHeight) {
        this.sidebarHeight = height;
        this.sidebarOverflow = 'auto';
        this.changeDetectorRef.detectChanges();
      }
    } else if(this.sidebarHeight) {
      this.sidebarOverflow = this.sidebarHeight = null;
      this.changeDetectorRef.detectChanges();
    }
  }
}
