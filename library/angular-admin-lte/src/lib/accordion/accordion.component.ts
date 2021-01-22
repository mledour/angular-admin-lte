import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren, ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { TemplateRef, QueryList } from '@angular/core';

import { Subscription } from 'rxjs';

import { AnimationEvent } from '../animations/animations.interface';
import { AccordionToggleDirective } from './accordion.directive';
import { removeListeners, removeSubscriptions } from '../helpers';



@Component({
  selector: 'mk-accordion-header',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class AccordionHeaderComponent {
  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;
}


@Component({
  selector: 'mk-accordion-content',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class AccordionContentComponent {
  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;
}


@Component({
  selector: 'mk-accordion',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class AccordionComponent implements OnInit, AfterViewInit {
  @Input() public borderColor?: string;
  @Input() public contentColor?: string;
  @Input() public contentStyleClass = 'box-body';
  @Input() public header?: string;
  @Input() public headerColor?: string;
  @Input() public headerColorHover?: string;
  @Input() public headerStyleClass = 'box-header with-border';

  @ContentChild(AccordionHeaderComponent) public accordionHeaderComponent?: AccordionHeaderComponent;
  @ContentChild(AccordionContentComponent) public accordionContentComponent?: AccordionContentComponent;

  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;

  public headerStyleColor?: string;
  public isCollapsing = false;
  public isCollapsed = false;
  public index = 0;

  ngOnInit(): void {
    this.headerStyleColor = this.headerColor;
  }

  ngAfterViewInit(): void {
    if (!this.header && !this.accordionHeaderComponent) {
      throw new Error('Attribute "header" OR Component "mk-accordion-header" is required for component "mk-accordion"');
    }
  }
}


@Component({
  selector: 'mk-accordion-group',
  templateUrl: './accordion.component.html'
})
export class AccordionGroupComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
  @Input('activeIndex') set _activeIndex(value: number[] | number) {
    this.activeIndex = value instanceof Array ? value : [value];
  }
  @Input() public isMultiple = false;
  @Input() public styleClass = 'box-group';

  @Output() public collapseStart = new EventEmitter();
  @Output() public collapseDone = new EventEmitter();

  @ContentChildren(AccordionComponent) public accordionComponents!: QueryList<AccordionComponent>;

  @ViewChildren(AccordionToggleDirective) private accordionToggleDirectives!: QueryList<AccordionToggleDirective>;

  private activeIndex: any = [0];
  private listeners: (() => void)[] = [];
  // @TODO change types for subscriptions to all files
  private subscriptions: Array<Subscription> = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private renderer2: Renderer2
  ) {}

  public static headerMouseLeave(accordion: AccordionComponent): void {
    accordion.headerStyleColor = accordion.headerColor;
  }

  public static headerMouseEnter(accordion: AccordionComponent): void {
    if (accordion.headerColorHover) {
      accordion.headerStyleColor = accordion.headerColorHover;
    }
  }

  ngAfterContentInit(): void {
    this.setAccordionsIndex();
    this.updateAccordionIsCollapsed();

    this.subscriptions.push(this.accordionComponents.changes.subscribe(() => {
      this.setAccordionsIndex();
    }));
  }

  ngAfterViewInit(): void {
    this.setAccordionsToggle();

    this.subscriptions.push(this.accordionToggleDirectives.changes.subscribe(() => {
      this.setAccordionsToggle();
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes._activeIndex.firstChange) {
      this.updateAccordionIsCollapsed();
    }
  }

  ngOnDestroy(): void {
    removeListeners(this.listeners);
    removeSubscriptions(this.subscriptions);
  }

  public toggleAccordion(event: Event, toggleIndex: number): void {
    event.preventDefault();

    const indexOf = this.activeIndex.indexOf(toggleIndex);
    if (indexOf === -1) {
      if (this.isMultiple) {
        this.activeIndex.push(toggleIndex);
      } else {
        this.activeIndex = [toggleIndex];
      }
    } else {
      if (this.isMultiple) {
        this.activeIndex.splice(indexOf, 1);
      } else {
        this.activeIndex = [];
      }
    }
    this.updateAccordionIsCollapsed();
  }

  public onCollapseStart(event: AnimationEvent, accordion: AccordionComponent): void {
    accordion.isCollapsing = true;
    this.collapseStart.emit({animationEvent: event, index: accordion.index});
  }

  public onCollapseDone(event: AnimationEvent, accordion: AccordionComponent): void {
    accordion.isCollapsing = false;
    this.collapseDone.emit({animationEvent: event, index: accordion.index});
  }

  private setAccordionsIndex(): void {
    this.accordionComponents.forEach((accordion: AccordionComponent, index: number) => {
      accordion.index = index;
    });
  }

  private setAccordionsToggle(): void {
    this.listeners = removeListeners(this.listeners);

    this.ngZone.runOutsideAngular(() => {
      this.accordionToggleDirectives.forEach((accordionToggle: AccordionToggleDirective) => {
        this.listeners.push(this.renderer2.listen(accordionToggle.elementRef.nativeElement, 'click', (event) => {
          this.toggleAccordion(event, accordionToggle.accordionComponent.index);
          this.changeDetectorRef.detectChanges();
        }));
        this.listeners.push(this.renderer2.listen(accordionToggle.elementRef.nativeElement, 'mouseenter', () => {
          AccordionGroupComponent.headerMouseEnter(accordionToggle.accordionComponent);
          this.changeDetectorRef.detectChanges();
        }));
        this.listeners.push(this.renderer2.listen(accordionToggle.elementRef.nativeElement, 'mouseleave', () => {
          AccordionGroupComponent.headerMouseLeave(accordionToggle.accordionComponent);
          this.changeDetectorRef.detectChanges();
        }));
      });
    });
  }

  private updateAccordionIsCollapsed(): void {
    this.accordionComponents.forEach((accordion: AccordionComponent, index: number) => {
      accordion.isCollapsed = this.activeIndex.indexOf(index) === -1;
    });
  }
}
