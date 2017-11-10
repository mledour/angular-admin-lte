import { Component, Input, AfterViewInit, EventEmitter, ElementRef, Output, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild, ViewContainerRef, NgZone, Renderer2, ViewRef } from '@angular/core';

import { collapseAnimation } from '../animations';
import { AnimationEvent } from '@angular/animations';

/*
 *
 */
@Component({
  selector: 'mk-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [collapseAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements AfterViewInit, OnDestroy {
  public dismissibleClass = 'alert-dismissible';
  public isDismissible = true;
  public remove = false;
  public removed: boolean;
  public type = 'alert';

  private removeButtonListener: Function;

  @Input() public backgroundColor = 'danger';
  @Input() public set callout(value: boolean) {
    this.type = value ? 'callout' : 'alert';
  }
  @Input() public color: string;
  @Input() public dismissOnTimeout: number;
  @Input('isDismissible') public set _isDismissible(value: boolean) {
    this.isDismissible = value;
    if(value) {
      this.dismissibleClass = `${this.type}-dismissible`;
    } else {
      this.dismissibleClass = '';
    }
  }
  @Input() public styleClass = '';

  @Output() public onCollapseStart = new EventEmitter();
  @Output() public onCollapseDone = new EventEmitter();

  @ViewChild('removeButtonElement') private removeButtonElement: ElementRef;
  @ViewChild('containerElementRef', { read: ViewContainerRef }) private containerElementRef: ViewContainerRef;

  /**
   * @method constructor
   * @param  {ChangeDetectorRef} privatechangeDetectorRef [description]
   * @param  {NgZone}            privatengZone            [description]
   * @param  {Renderer2}         privaterenderer2         [description]
   * @param  {ViewContainerRef}  privateviewContainer     [description]
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private renderer2: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {}

  /**
   * @method ngOnInit
   */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      if(this.dismissOnTimeout) {
        setTimeout(() => {
          if(!(this.changeDetectorRef as ViewRef).destroyed) {
            this.remove = true;
            this.changeDetectorRef.detectChanges();
          }
        }, this.dismissOnTimeout);
      }
      if(this.removeButtonElement) {
        this.removeButtonListener = this.renderer2.listen(this.removeButtonElement.nativeElement, 'click', (event) => {
          this.remove = true;
          this.changeDetectorRef.detectChanges();
        });
      }
    });
  }

  /**
   * @method ngOnDesroy
   */
  ngOnDestroy() {
    if(this.removeButtonListener) {
      this.removeButtonListener();
    }
  }

  /**
   * [collapseStart description]
   * @method collapseStart
   * @param  {AnimationEvent} event [description]
   */
  public collapseStart(event: AnimationEvent): void {
    this.onCollapseStart.emit(event);
  }

  /**
   * [collapseDone description]
   * @method collapseDone
   * @param  {AnimationEvent} event [description]
   */
  public collapseDone(event: AnimationEvent): void {
    if(event.toState === '1') {
      if(this.removeButtonListener) {
        this.removeButtonListener();
      }
      this.removed = true;
      this.viewContainerRef.clear();
      this.changeDetectorRef.detectChanges();
    }
    this.onCollapseDone.emit(event);
  }
}
