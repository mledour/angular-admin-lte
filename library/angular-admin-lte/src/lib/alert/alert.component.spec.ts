import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

import { AnimationsModule } from '../animations/animations.module';
import { ColorModule } from '../color/color.module';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      imports: [AnimationsModule, ColorModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });


  /**
   *
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   *
   */
  it('should remove on timeout', fakeAsync(() => {
    component.dismissOnTimeout = 1;
    component.ngAfterViewInit();
    tick(1);
    expect(component.remove).toBe(true, 'remove');
    expect(component.removed).toBe(true, 'removed');
  }));

  /**
   *
   */
  it('should remove on click', async(() => {
    const spyOnCollapseStart = spyOn(component, 'collapseStart').and.callThrough();
    const spyOnCollapseDone = spyOn(component, 'collapseDone').and.callThrough();

    component.removeAlert();

    fixture.detectChanges();

    expect(component.remove).toBe(true, 'remove');
    expect(spyOnCollapseStart.calls.any()).toBe(true, 'collapseStart');

    fixture.whenStable().then(() => {
      expect(spyOnCollapseDone.calls.any()).toBe(true, 'collapseDone');
      expect(component.removed).toBe(true, 'removed');
    });
  }));
});

