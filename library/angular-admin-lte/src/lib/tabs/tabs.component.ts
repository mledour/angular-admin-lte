import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren, ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChange,
  ViewChild,
  ViewChildren
} from '@angular/core';
import type { TemplateRef, QueryList } from '@angular/core';

import { Subscription } from 'rxjs';

import { TabToggleDirective } from './tabs.directive';
import { removeListeners, removeSubscriptions } from '../helpers';


@Component({
  selector: 'mk-tab-header',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabHeaderComponent {
  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;
}


@Component({
  selector: 'mk-tab-content',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabContentComponent {
  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;
}


@Component({
  selector: 'mk-tab',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
  @Input() public header?: string;
  @Input() public isDisabled = false;
  @Input() public tabColor?: string;

  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;

  @ContentChild(TabHeaderComponent) public tabHeaderComponent?: TabHeaderComponent;
  @ContentChild(TabContentComponent) public tabContentComponent?: TabContentComponent;

  public index!: number;
  public isActive = false;
}


@Component({
  selector: 'mk-tabs-header',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsHeaderComponent {
  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;
}


@Component({
  selector: 'mk-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() public set activeTabIndex(index: number) {
    this.activatedTabIndex = index;
    this.changeDetectorRef.detectChanges();
  }
  @Input() public header?: string;
  @Input() public headerStyleClass = 'header pull-left';
  @Input() public navStyleClass = 'nav nav-tabs';
  @Input() public contentStyleClass = 'tab-content';
  @Input() public styleClass = 'nav-tabs-custom';
  @Input() public tabsColor?: string;

  @Output() public closeTab = new EventEmitter();
  @Output() public openTab = new EventEmitter();

  @ContentChild(TabsHeaderComponent) public tabsHeaderComponent?: TabsHeaderComponent;

  @ContentChildren(TabComponent) public tabs?: QueryList<TabComponent>;

  @ViewChildren(TabToggleDirective) public tabToggleDirectives?: QueryList<TabToggleDirective>;

  private activatedTabIndex?: number;
  private listeners: (() => void)[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private renderer2: Renderer2
  ) {}

  ngAfterContentInit(): void {
    // Set tab index on load.
    this.setTabIndex();

    // Update tab index if tabs is updated.
    if (this.tabs) {
      this.subscriptions.push(this.tabs.changes.subscribe(() => {
        this.setTabIndex();
      }));
    }

    // Open tab on load.
    this.openTabIndex();
  }

  ngAfterViewInit(): void {
    // Set tab toggles on load.
    this.setTabsToggle();

    // Update tab toggles if tabs is updated.
    if (this.tabToggleDirectives) {
      this.subscriptions.push(this.tabToggleDirectives.changes.subscribe(() => {
        this.setTabsToggle();
      }));
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
    if (changes.activeTabIndex) {
      this.openTabIndex();
    }
  }

  ngOnDestroy(): void {
    removeListeners(this.listeners);
    removeSubscriptions(this.subscriptions);
  }

  public openTabIndex(): void {
    if (this.tabs) {
      this.tabs.forEach((tab: TabComponent) => {
        if (this.activatedTabIndex === tab.index || (this.activatedTabIndex === undefined && tab.index === 0)) {
          tab.isActive = true;
          this.openTab.emit({index: tab.index});
          this.changeDetectorRef.detectChanges();
        } else if (tab.isActive) {
          tab.isActive = false;
          this.closeTab.emit({index: tab.index});
          this.changeDetectorRef.detectChanges();
        }
      });
    }
  }

  public onOpenTab(event: Event, tabToOpen: TabComponent): void {
    event.preventDefault();
    tabToOpen.isActive = true;
    this.openTab.emit({event, index: tabToOpen.index});

    if (this.tabs) {
      this.tabs.forEach((tab: TabComponent) => {
        if (tab.isActive && tabToOpen !== tab) {
          tab.isActive = false;
          this.closeTab.emit({event, index: tab.index});
        }
      });
    }
  }

  private setTabIndex(): void {
    if (this.tabs) {
      this.tabs.forEach((tab: TabComponent, index: number) => {
        tab.index = index;
      });
    }

    this.changeDetectorRef.detectChanges();
  }

  private setTabsToggle(): void {
    this.listeners = removeListeners(this.listeners);
    this.ngZone.runOutsideAngular(() => {
      this.tabToggleDirectives?.forEach((tabToggle: TabToggleDirective) => {
        this.listeners.push(this.renderer2.listen(tabToggle.elementRef.nativeElement, 'click', (event) => {
          this.onOpenTab(event, tabToggle.tabComponent);
          this.changeDetectorRef.detectChanges();
        }));
      });
    });
  }
}
