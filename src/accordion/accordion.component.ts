import { Component, OnInit, AfterContentInit, AfterViewInit, OnChanges, SimpleChanges, Input, ViewChild, ContentChild, ContentChildren, OnDestroy, QueryList, TemplateRef, EventEmitter, Output, ViewChildren, NgZone, Renderer2, ChangeDetectorRef } from '@angular/core';

import { AnimationEvent } from '../animations/animations.interface';

import { AccordionToggleDirective } from './accordion.directive';

import { removeSubscriptions, removeListeners } from '../helpers';

/*
 *
 */
@Component({
  selector: 'mk-accordion-header',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class AccordionHeaderComponent {
  @ViewChild('templateRef') public templateRef: TemplateRef<any>;
}


/*
 *
 */
@Component({
  selector: 'mk-accordion-content',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class AccordionContentComponent {
  @ViewChild('templateRef') public templateRef: TemplateRef<any>;
}


/*
 *
 */
@Component({
  selector: 'mk-accordion',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class AccordionComponent implements OnInit {
  public contentTemplateRef: TemplateRef<AccordionContentComponent>;
  public headerStyleColor: string;
  public isCollapsing: boolean;
  public isCollapsed: boolean;
  public index: number;

  @Input() public borderColor: string;
  @Input() public contentColor: string;
  @Input() public contentStyleClass = 'box-body';
  @Input() public header: string;
  @Input() public headerColor: string;
  @Input() public headerColorHover: string;
  @Input() public headerStyleClass = 'box-header with-border';

  @ContentChild(AccordionHeaderComponent) public accordionHeaderComponent: AccordionHeaderComponent;
  @ContentChild(AccordionContentComponent) public accordionContentComponent: AccordionContentComponent;

  @ViewChild('templateRef') public templateRef: TemplateRef<any>;

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    this.headerStyleColor = this.headerColor;

    if(!this.header && !this.accordionHeaderComponent) {
      throw new Error('Attribute "header" OR Component "mk-accordion-header" is required for component "mk-accordion"');
    }

    if(this.accordionContentComponent) {
      this.contentTemplateRef = this.accordionContentComponent.templateRef;
    } else {
      this.contentTemplateRef = this.templateRef;
    }
  }
}


/*
 *
 */
@Component({
  selector: 'mk-accordion-group',
  templateUrl: './accordion.component.html'
})
export class AccordionGroupComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
  private activeIndex: any = [0];
  private listeners = [];
  private subscriptions = [];

  @Input('activeIndex') set _activeIndex(value) {
    this.activeIndex = value instanceof Array ? value : [value];
  }
  @Input() public isMultiple: boolean;
  @Input() public styleClass = 'box-group'

  @Output() public onCollapseStart = new EventEmitter();
  @Output() public onCollapseDone = new EventEmitter();

  @ContentChildren(AccordionComponent) public accordionComponents: QueryList<AccordionComponent>;

  @ViewChildren(AccordionToggleDirective) private accordionToggleDirectives: QueryList<AccordionToggleDirective>;

  /**
   * @method constructor
   * @param  {ChangeDetectorRef} changeDetectorRef [description]
   * @param  {NgZone}            ngZone            [description]
   * @param  {Renderer2}         renderer2         [description]
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private renderer2: Renderer2
  ) {}

  /**
   * @method ngAfterViewInit
   */
  ngAfterContentInit() {
    this.setAccordionsIndex();
    this.updateAccordionIsCollapsed();

    this.subscriptions.push(this.accordionComponents.changes.subscribe(changes => {
      this.setAccordionsIndex();
    }));
  }

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    this.setAccordionsToggle();

    this.subscriptions.push(this.accordionToggleDirectives.changes.subscribe(changes => {
      this.setAccordionsToggle();
    }));
  }

  /**
   * [ngOnChanges description]
   * @method ngOnChanges
   * @param  {[type]}    changes [description]
   * @return {[type]}            [description]
   */
  ngOnChanges(changes: SimpleChanges) {
    if(changes._activeIndex.firstChange === false) {
      this.updateAccordionIsCollapsed();
    }
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    removeListeners(this.listeners);
    removeSubscriptions(this.subscriptions);
  }

  /**
   * [headerMouseEnter description]
   * @method headerMouseEnter
   * @param  {AccordionComponent} accordion [description]
   */
  public headerMouseEnter(accordion: AccordionComponent): void {
    if(accordion.headerColorHover) {
      accordion.headerStyleColor = accordion.headerColorHover;
    }
  }

  /**
   * [headerMouseLeave description]
   * @method headerMouseLeave
   * @param  {AccordionComponent} accordion [description]
   */
  public headerMouseLeave(accordion: AccordionComponent): void {
    accordion.headerStyleColor = accordion.headerColor;
  }

  /**
   * [toggleAccordion description]
   * @method toggleAccordion
   * @param  {Event}         event       [description]
   * @param  {number}        toggleIndex [description]
   */
  public toggleAccordion(event: Event, toggleIndex: number): void {
    event.preventDefault();

    let indexOf = this.activeIndex['indexOf'](toggleIndex);
    if(indexOf === -1) {
      if(this.isMultiple) {
        this.activeIndex.push(toggleIndex);
      } else {
        this.activeIndex = [toggleIndex];
      }
    } else {
      if(this.isMultiple) {
        this.activeIndex.splice(indexOf, 1);
      } else {
        this.activeIndex = [];
      }
    }
    this.updateAccordionIsCollapsed();
  }

  /**
   * [collapseStart description]
   * @method collapseStart
   * @param  {AnimationEvent} event [description]
   * @param  {[type]}         index [description]
   */
  public collapseStart(event: AnimationEvent, accordion: AccordionComponent): void {
    accordion.isCollapsing = true;
    this.onCollapseStart.emit({animationEvent: event, index: accordion.index});
  }

  /**
   * [collapseDone description]
   * @method collapseDone
   * @param  {AnimationEvent} event [description]
   */
  public collapseDone(event: AnimationEvent, accordion: AccordionComponent): void {
    accordion.isCollapsing = false;
    this.onCollapseDone.emit({animationEvent: event, index: accordion.index});
  }

  /**
   * [setAccordionsIndex description]
   * @method setAccordionsIndex
   */
  private setAccordionsIndex(): void {
    this.accordionComponents.forEach((accordion: AccordionComponent, index: number) => {
      accordion.index = index;
    });
  }

  /**
   * [setAccordionsToggle description]
   * @method setAccordionsToggle
   */
  private setAccordionsToggle(): void {
    this.listeners = removeListeners(this.listeners);

    this.ngZone.runOutsideAngular(() => {
      this.accordionToggleDirectives.forEach((accordionToggle: AccordionToggleDirective) => {
        this.listeners.push(this.renderer2.listen(accordionToggle.elementRef.nativeElement, 'click', (event) => {
          this.toggleAccordion(event, accordionToggle.accordionComponent.index);
          this.changeDetectorRef.detectChanges();
        }));
        this.listeners.push(this.renderer2.listen(accordionToggle.elementRef.nativeElement, 'mouseenter', (event) => {
          this.headerMouseEnter(accordionToggle.accordionComponent);
          this.changeDetectorRef.detectChanges();
        }));
        this.listeners.push(this.renderer2.listen(accordionToggle.elementRef.nativeElement, 'mouseleave', (event) => {
          this.headerMouseLeave(accordionToggle.accordionComponent);
          this.changeDetectorRef.detectChanges();
        }));
      });
    });
  }

  /**
   * [updateAccordionIsCollapsed description]
   * @method updateAccordionIsCollapsed
   */
  private updateAccordionIsCollapsed(): void {
    this.accordionComponents.forEach((accordion: AccordionComponent, index: number) => {
      if(this.activeIndex.indexOf(index) === -1) {
        accordion.isCollapsed = true;
      } else {
        accordion.isCollapsed = false;
      }
    });
  }
}
