import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {AnimationEvent} from '../animations/animations.interface';

import {removeListeners} from '../helpers';

/*
 *
 */
@Component({
  selector: 'mk-dropdown-toggle',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownToggleComponent {
  @ViewChild('templateRef', { static: true }) public templateRef: TemplateRef<any>;
  @ContentChild('toggleElement', /* TODO: add static flag */ {}) public toggleElement: ElementRef;
}


/*
 *
 */
@Component({
  selector: 'mk-dropdown-menu',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMenuComponent {
  @ViewChild('templateRef', { static: true }) public templateRef: TemplateRef<any>;
}


/*
 *
 */
@Component({
  selector: 'mk-dropdown, [mk-dropdown]',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements AfterViewInit, OnDestroy {
  private documentClickListener: () => void;
  private listeners = [];

  @Input() public buttonStyleClass = 'btn dropdown-toggle';
  @Input() public buttonBackgroudColor = 'default';
  @Input() public contentStyleClass = 'dropdown-menu';
  @Input() public isCollapsed = true;
  @Input() public isWrapper = true;
  @Input() public styleClass = 'dropdown';
  @Input() public toggleElement: Element;
  @Input() public toggleText: string;

  @Output() public collapseStart = new EventEmitter();
  @Output() public collapseDone = new EventEmitter();

  @ContentChild(DropdownToggleComponent, /* TODO: add static flag */ {}) public dropdownToggleComponent: DropdownToggleComponent;
  @ContentChild(DropdownMenuComponent, /* TODO: add static flag */ {}) public dropdownMenuComponent: DropdownMenuComponent;

  @ViewChild('toggleElement') private defaultToggleElement: ElementRef;

  /**
   * @method constructor
   * @param changeDetectorRef [description]
   * @param elementRef [description]
   * @param ngZone [description]
   * @param renderer2 [description]
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private renderer2: Renderer2
  ) {}

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    const toggleNativeElement = this.dropdownToggleComponent && this.dropdownToggleComponent.toggleElement ?
      this.dropdownToggleComponent.toggleElement.nativeElement : this.toggleElement ?
        this.toggleElement : this.defaultToggleElement ?
          this.defaultToggleElement.nativeElement : null;
    if (toggleNativeElement) {
      this.ngZone.runOutsideAngular(() => {
        this.listeners.push(this.renderer2.listen(toggleNativeElement, 'click', (event: Event) => {
          this.toggleDropdown(event);
          this.changeDetectorRef.detectChanges();
        }));
      });
    }
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    this.unBindDocumentClickListener();
    removeListeners(this.listeners);
  }

  /**
   * [toggle description]
   * @method toggle
   * @param event [description]
   */
  public toggleDropdown(event: Event): void {
    event.preventDefault();
    this.isCollapsed = !this.isCollapsed;
    if (!this.isCollapsed) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout (() => {
          this.bindDocumentClickListener();
        });
      });
    } else {
      this.unBindDocumentClickListener();
    }
  }

  /**
   * [collapseStart description]
   * @method collapseStart
   * @param event [description]
   */
  public onCollapseStart(event: AnimationEvent): void {
    this.collapseStart.emit(event);
  }

  /**
   * [collapseDone description]
   * @method collapseDone
   * @param event [description]
   */
  public onCollapseDone(event: AnimationEvent): void {
    this.collapseStart.emit(event);
  }

  /**
   * [bindDocumentClickListener description]
   * @method bindDocumentClickListener
   */
  private bindDocumentClickListener(): void {
    this.ngZone.runOutsideAngular(() => {
      this.documentClickListener = this.renderer2.listen('document', 'click', () => {
        if (!this.isCollapsed) {
          this.isCollapsed = true;
          this.unBindDocumentClickListener();
          this.changeDetectorRef.detectChanges();
        }
      });
    });
  }

  /**
   * [unBindDocumentClickListener description]
   * @method unBindDocumentClickListener
   */
  private unBindDocumentClickListener(): void {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }
}
