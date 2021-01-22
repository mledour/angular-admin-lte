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
  ViewChild
} from '@angular/core';
import type { TemplateRef } from '@angular/core';

import {AnimationEvent} from '../animations/animations.interface';
import {removeListeners} from '../helpers';


@Component({
  selector: 'mk-dropdown-toggle',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownToggleComponent {
  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;
  @ContentChild('toggleElement') public toggleElement?: ElementRef;
}


@Component({
  selector: 'mk-dropdown-menu',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMenuComponent {
  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;
}


@Component({
  selector: 'mk-dropdown, [mk-dropdown]',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements AfterViewInit, OnDestroy {
  @Input() public buttonStyleClass = 'btn dropdown-toggle';
  @Input() public buttonBackgroundColor = 'default';
  @Input() public contentStyleClass = 'dropdown-menu';
  @Input() public isCollapsed = true;
  @Input() public isWrapper = true;
  @Input() public styleClass = 'dropdown';
  @Input() public toggleElement?: Element;
  @Input() public toggleText?: string;

  @Output() public collapseStart = new EventEmitter();
  @Output() public collapseDone = new EventEmitter();

  @ContentChild(DropdownToggleComponent) public dropdownToggleComponent?: DropdownToggleComponent;
  @ContentChild(DropdownMenuComponent) public dropdownMenuComponent?: DropdownMenuComponent;

  @ViewChild('toggleElement') private defaultToggleElement?: ElementRef;

  private documentClickListener?: () => void;
  private listeners: (() => void)[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private renderer2: Renderer2
  ) {}

  ngAfterViewInit(): void {
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

  ngOnDestroy(): void {
    this.unBindDocumentClickListener();
    removeListeners(this.listeners);
  }

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

  public onCollapseStart(event: AnimationEvent): void {
    this.collapseStart.emit(event);
  }

  public onCollapseDone(event: AnimationEvent): void {
    this.collapseStart.emit(event);
  }

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

  private unBindDocumentClickListener(): void {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }
}
