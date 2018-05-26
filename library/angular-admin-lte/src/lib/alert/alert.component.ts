import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewRef
} from '@angular/core';

import {AnimationEvent} from '../animations/animations.interface';

import {removeListeners} from '../helpers';

/*
 *
 */
@Component({
  selector: 'mk-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements AfterViewInit, OnDestroy {
  public dismissibleClass = 'alert-dismissible';
  public isDismissible = true;
  public remove = false;
  public removed: boolean;
  public type = 'alert';

  private listeners = [];

  @Input() public backgroundColor = 'danger';
  @Input() public set callout(value: boolean) {
    this.type = value ? 'callout' : 'alert';
  }
  @Input() public color: string;
  @Input() public dismissOnTimeout: number;
  @Input('isDismissible') public set _isDismissible(value: boolean) {
    this.isDismissible = value;
    if (value) {
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
   * @param  changeDetectorRef [description]
   * @param  ngZone            [description]
   * @param  renderer2         [description]
   * @param  viewContainerRef  [description]
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
      if (this.dismissOnTimeout) {
        setTimeout(() => {
          if (!(this.changeDetectorRef as ViewRef).destroyed) {
            this.remove = true;
            this.changeDetectorRef.detectChanges();
          }
        }, this.dismissOnTimeout);
      }
      if (this.removeButtonElement) {
        this.listeners.push(this.renderer2.listen(this.removeButtonElement.nativeElement, 'click', () => {
          this.remove = true;
          this.changeDetectorRef.detectChanges();
        }));
      }
    });
  }

  /**
   * @method ngOnDesroy
   */
  ngOnDestroy() {
    removeListeners(this.listeners);
  }

  /**
   * [collapseStart description]
   * @method collapseStart
   * @param event [description]
   */
  public collapseStart(event: AnimationEvent): void {
    this.onCollapseStart.emit(event);
  }

  /**
   * [collapseDone description]
   * @method collapseDone
   * @param event [description]
   */
  public collapseDone(event: AnimationEvent): void {
    if (event.toState === '1') {
      this.listeners = removeListeners(this.listeners);
      this.removed = true;
      this.viewContainerRef.clear();
      this.changeDetectorRef.detectChanges();
    }
    this.onCollapseDone.emit(event);
  }
}
