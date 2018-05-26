import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

import {AnimationEvent} from '../animations/animations.interface';

import {BoxContentDirective, BoxFooterDirective, BoxHeaderDirective, BoxToolsDirective} from './box.directive';

import {removeListeners} from '../helpers';

/*
 *
 */
@Component({
  selector: 'mk-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent implements AfterViewInit, OnDestroy {
  public isCollaping: boolean;
  public remove = false;
  public removed: boolean;
  private listeners = [];

  @Input() public boxColor = 'default';
  @Input() public buttonsStyleClass = 'btn btn-box-tool';
  @Input() public contentStyleClass = 'box-content-wrapper';
  @Input() public contentColor: string;
  @Input() public footer: string;
  @Input() public footerColor: string;
  @Input() public footerStyleClass = 'box-footer';
  @Input() public header: string;
  @Input() public headerBorder = true;
  @Input() public headerColor: string;
  @Input() public headerStyleClass = 'box-header';
  @Input() public isCollapsable = true;
  @Input() public isCollapsed = false;
  @Input() public isLoading: boolean;
  @Input() public isRemovable = true;
  @Input() public isSolid = false;
  @Input() public loadingColor: string;
  @Input() public loadingStyleClass = 'fa fa-refresh fa-spin';
  @Input() public styleClass = 'box';

  @Output() public onCollapseDone = new EventEmitter();
  @Output() public onCollapseStart = new EventEmitter();

  @ContentChild(BoxHeaderDirective) public boxHeaderDirective: BoxHeaderDirective;
  @ContentChild(BoxFooterDirective) public boxFooterDirective: BoxFooterDirective;
  @ContentChild(BoxContentDirective) public boxContentDirective: BoxContentDirective;
  @ContentChild(BoxToolsDirective) public boxToolsDirective: BoxToolsDirective;

  @ViewChild('toggleButtonElement') private toggleButtonElement;
  @ViewChild('removeButtonElement') private removeButtonElement;

  /**
   * @method constructor
   * @param changeDetectorRef [description]
   * @param ngZone            [description]
   * @param renderer2         [description]
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private renderer2: Renderer2
  ) {}

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      if (this.toggleButtonElement) {
        this.listeners.push(this.renderer2.listen(this.toggleButtonElement.nativeElement, 'click', () => {
          this.isCollapsed = !this.isCollapsed;
          this.changeDetectorRef.detectChanges();
        }));
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
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    removeListeners(this.listeners);
  }

  /**
   * [removedDone description]
   * @method removedDone
   * @param event [description]
   */
  public removedDone(event): void {
    if (event.toState === '1') {
      this.removed = true;
    }
  }

  /**
   * [collapseStart description]
   * @method collapseStart
   * @param event [description]
   */
  public collapseStart(event: AnimationEvent): void {
    if (event.fromState !== 'void') {
      this.isCollaping = true;
      this.onCollapseStart.emit(event);
    }
  }

  /**
   * [collapseDone description]
   * @method collapseDone
   * @param event [description]
   */
  public collapseDone(event: AnimationEvent): void {
    if (event.fromState !== 'void') {
      this.isCollaping = false;
      this.onCollapseDone.emit(event);
    }
  }
}
