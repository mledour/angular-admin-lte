import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AnimationsModule } from '../animations/animations.module';
import { ColorModule } from '../color/color.module';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DropdownComponent, DropdownMenuComponent, DropdownToggleComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let button: DebugElement;
  let content: DebugElement;
  let clickButton: Function;

  /**
   *
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent, DropdownToggleComponent, DropdownMenuComponent],
      imports: [AnimationsModule, ColorModule]
    }).compileComponents();
  }));

  /**
   *
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);

    component = fixture.componentInstance;
    component.toggleText = 'toggle button text';
    component.isWrapper = true;

    spyOn(component, 'toggleDropdown').and.callThrough();
    spyOn(component.onCollapseStart, 'emit');
    spyOn(component.onCollapseDone, 'emit');

    component.ngAfterViewInit();
    fixture.detectChanges();

    button = fixture.debugElement.query(By.css('button'));
    content = fixture.debugElement.query(By.css('.dropdown-menu'));
  });

  /**
   *
   */
  clickButton = function buttonClick() {
    button.triggerEventHandler('click', null);
    content.triggerEventHandler('collapseAnimation.done', null);
    tick();
    fixture.detectChanges();
  };

  /**
   *
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   *
   */
  it('should have button text', () => {
    expect(fixture.nativeElement.innerHTML).toContain('toggle button text');
  });

  /**
   *
   */
  it('should have dropdown elements', () => {
    expect(fixture.nativeElement.innerHTML).toContain('dropdown-toggle');
    expect(fixture.nativeElement.innerHTML).toContain('dropdown-menu');
  });

  /**
   *
   */
  it('should toggle on click', fakeAsync(() => {
    expect(component.isCollapsed).toBe(true);
    expect(component.toggleDropdown).toHaveBeenCalledTimes(0);
    expect(component.onCollapseStart.emit).toHaveBeenCalledTimes(1);
    expect(component.onCollapseDone.emit).toHaveBeenCalledTimes(1);

    clickButton();

    expect(component.isCollapsed).toBe(false);
    expect(component.toggleDropdown).toHaveBeenCalledTimes(1);
    expect(component.onCollapseStart.emit).toHaveBeenCalledTimes(2);
    expect(component.onCollapseDone.emit).toHaveBeenCalledTimes(2);

    clickButton();

    expect(component.isCollapsed).toBe(true);
    expect(component.toggleDropdown).toHaveBeenCalledTimes(2);
    expect(component.onCollapseStart.emit).toHaveBeenCalledTimes(3);
    expect(component.onCollapseDone.emit).toHaveBeenCalledTimes(3);
  }));
});

