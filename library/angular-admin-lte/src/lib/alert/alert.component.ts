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


@Component({
  selector: 'mk-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements AfterViewInit, OnDestroy {
  @Input() public backgroundColor = 'danger';
  @Input() public set callout(value: boolean) {
    this.type = value ? 'callout' : 'alert';
  }
  @Input() public color?: string;
  @Input() public dismissOnTimeout?: number;
  @Input('isDismissible') public set _isDismissible(value: boolean) {
    this.isDismissible = value;
    if (value) {
      this.dismissibleClass = `${this.type}-dismissible`;
    } else {
      this.dismissibleClass = '';
    }
  }
  @Input() public styleClass = '';

  @Output() public collapseStart = new EventEmitter();
  @Output() public collapseDone = new EventEmitter();

  @ViewChild('removeButtonElement') private removeButtonElement?: ElementRef;

  public dismissibleClass = 'alert-dismissible';
  public isDismissible = true;
  public remove = false;
  public removed = false;
  public type = 'alert';

  private listeners: (() => void)[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private renderer2: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngAfterViewInit(): void {
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

  ngOnDestroy(): void {
    removeListeners(this.listeners);
  }

  public onCollapseStart(event: AnimationEvent): void {
    this.collapseStart.emit(event);
  }

  public onCollapseDone(event: AnimationEvent): void {
    if (event.toState === '1') {
      this.listeners = removeListeners(this.listeners);
      this.removed = true;
      this.viewContainerRef.clear();
      this.changeDetectorRef.detectChanges();
    }
    this.collapseDone.emit(event);
  }
}
