import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild, ElementRef,
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


@Component({
  selector: 'mk-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent implements AfterViewInit, OnDestroy {
  @Input() public boxColor = 'default';
  @Input() public buttonsStyleClass = 'btn btn-box-tool';
  @Input() public contentStyleClass = 'box-content-wrapper';
  @Input() public contentColor?: string;
  @Input() public footer?: string;
  @Input() public footerColor?: string;
  @Input() public footerStyleClass = 'box-footer';
  @Input() public header?: string;
  @Input() public headerBorder = true;
  @Input() public headerColor?: string;
  @Input() public headerStyleClass = 'box-header';
  @Input() public isCollapsable = true;
  @Input() public isCollapsed = false;
  @Input() public isLoading = false;
  @Input() public isRemovable = true;
  @Input() public isSolid = false;
  @Input() public loadingColor?: string;
  @Input() public loadingStyleClass = 'fa fa-refresh fa-spin';
  @Input() public styleClass = 'box';

  @Output() public collapseDone = new EventEmitter();
  @Output() public collapseStart = new EventEmitter();

  @ContentChild(BoxHeaderDirective) public boxHeaderDirective?: BoxHeaderDirective;
  @ContentChild(BoxFooterDirective) public boxFooterDirective?: BoxFooterDirective;
  @ContentChild(BoxContentDirective) public boxContentDirective?: BoxContentDirective;
  @ContentChild(BoxToolsDirective) public boxToolsDirective?: BoxToolsDirective;

  @ViewChild('toggleButtonElement') private toggleButtonElement?: ElementRef<HTMLButtonElement>;
  @ViewChild('removeButtonElement') private removeButtonElement?: ElementRef<HTMLButtonElement>;

  public isCollapsing = false;
  public remove = false;
  public removed = false;
  private listeners: (() => void)[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private renderer2: Renderer2
  ) {}

  ngAfterViewInit(): void {
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

  ngOnDestroy(): void {
    removeListeners(this.listeners);
  }

  public removedDone(event: AnimationEvent): void {
    if (event.toState === '1') {
      this.removed = true;
    }
  }

  public onCollapseStart(event: AnimationEvent): void {
    if (event.fromState !== 'void') {
      this.isCollapsing = true;
      this.collapseStart.emit(event);
    }
  }

  public onCollapseDone(event: AnimationEvent): void {
    if (event.fromState !== 'void') {
      this.isCollapsing = false;
      this.collapseDone.emit(event);
    }
  }
}
