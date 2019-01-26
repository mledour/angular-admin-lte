import { Directive, Input, Output, ElementRef, EventEmitter, Renderer2, NgZone, AfterContentInit, OnInit, OnDestroy } from '@angular/core';
import { AnimationEvent } from './animations.interface';
/*
 *
 */
@Directive({
  selector: '[mkCollapseAnimation]'
})
export class CollapseAnimationDirective implements OnInit, AfterContentInit, OnDestroy {
  private firstStart = true;
  private isCollapsed: boolean;
  private lastIsCollapsed: boolean;
  private transitioning: boolean;
  private listener: Function;

  @Input() public collapseAnimationDuration = 350;
  @Input() public collapseAnimationTiming: string;
  @Input('mkCollapseAnimation') public set _isCollapsed(value: boolean) {
    this.lastIsCollapsed = this.isCollapsed;
    this.isCollapsed = value;
    if (!this.firstStart) {
      this.emit('start');
      if (value) {
        this.collapse();
      } else if (value === false) {
        this.unCollapse();
      }
    }
  }

  @Output('mkCollapseAnimation.start') public startEventEmitter = new EventEmitter();
  @Output('mkCollapseAnimation.done') public doneEventEmitter = new EventEmitter();


  /**
   * @method constructor
   * @param elementRef [description]
   * @param ngZone     [description]
   * @param renderer2  [description]
   */
  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private renderer2: Renderer2
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    if (this.collapseAnimationDuration && this.collapseAnimationDuration !== 350) {
      this.renderer2.setStyle(this.elementRef.nativeElement, 'transition-duration', `${this.collapseAnimationDuration}ms`);
    }
    if (this.collapseAnimationTiming) {
      this.renderer2.setStyle(this.elementRef.nativeElement, 'transition-timing-function', this.collapseAnimationTiming);
    }
  }

  /**
   * @method ngAfterContentInit
   */
  ngAfterContentInit() {
    this.emit('start');
    if (this.isCollapsed) {
      this.renderer2.setStyle(this.elementRef.nativeElement, 'display', 'none');
      this.renderer2.addClass(this.elementRef.nativeElement, 'collapsing');
    }
    this.emit('done');
    this.firstStart = false;

    this.subscriptions();
  }

  /**
   * [ngOnDestroy description]
   * @method ngOnDestroy
   * @return [description]
   */
  ngOnDestroy() {
    if (this.listener) {
      this.listener();
    }
  }

  /**
   * [subscriptions description]
   * @method subscriptions
   */
  private subscriptions(): void {
    this.ngZone.runOutsideAngular(() => {
      this.listener = this.renderer2.listen(this.elementRef.nativeElement, 'transitionend', () => {
        if (!this.isCollapsed) {
          this.renderer2.removeClass(this.elementRef.nativeElement, 'un-collapse');
          this.renderer2.removeClass(this.elementRef.nativeElement, 'collapsing');
        } else {
          this.renderer2.setStyle(this.elementRef.nativeElement, 'display', 'none');
        }
        requestAnimationFrame(() => {
          this.renderer2.removeStyle(this.elementRef.nativeElement, 'height');
          this.emit('done');
          this.transitioning = false;
        });
      });
    });
  }


  /**
   * [unCollapse description]
   * @method unCollapse
   */
  private unCollapse(): void {
    this.transitioning = true;
    this.renderer2.addClass(this.elementRef.nativeElement, 'un-collapse');
    this.renderer2.removeStyle(this.elementRef.nativeElement, 'display');
    this.renderer2.setStyle(this.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.scrollHeight}px`);
  }

  /**
   * [collapse description]
   * @method collapse
   */
  private collapse(): void {
    requestAnimationFrame(() => {
      if (!this.transitioning) {
        this.renderer2.setStyle(this.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.offsetHeight}px`);
        this.renderer2.addClass(this.elementRef.nativeElement, 'collapsing');
      }
      this.transitioning = true;
      requestAnimationFrame(() => {
        this.renderer2.setStyle(this.elementRef.nativeElement, 'height', `0px`);
      });
    });
  }

  private emit(phaseName: string): void {
    const event: AnimationEvent = {
      element: this.elementRef.nativeElement,
      fromState: this.lastIsCollapsed === undefined ? 'void' : this.lastIsCollapsed ? '1' : '0',
      phaseName: phaseName,
      toState: this.isCollapsed === undefined ? 'void' : this.isCollapsed ? '1' : '0',
      totalTime: this.collapseAnimationDuration,
      triggerName: 'mkCollapseAnimation'
    };

    if (phaseName === 'done') {
      this.doneEventEmitter.emit(event);
    } else if (phaseName === 'start') {
      this.startEventEmitter.emit(event);
    }
  }
}
