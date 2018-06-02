import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

import { AnimationsModule } from '../animations/animations.module';
import { ColorModule } from '../color/color.module';
import { AnimationEvent } from '../animations/animations.interface';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      imports: [AnimationsModule, ColorModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngAfterViewInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('remove alert', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    const removeAlertSpy = spyOn(component, 'removeAlert').and.callThrough();
    const onCollapseDoneSpy = spyOn(component, 'onCollapseDone').and.callThrough();
    button.click();
    //expect(component.remove).toBe(true, 'should removing the alert');

    fixture.whenStable().then(() => {
      //expect(component.onCollapseDone).toHaveBeenCalled();
      expect(removeAlertSpy.calls.any()).toBe(true, 'removeAlert called');
      expect(onCollapseDoneSpy.calls.any()).toBe(true, 'onCollapseDoneSpy called');
      expect(component.removed).toBe(true, 'should remove alert');
    });
    /*expect(component.remove).toBe(false, 'show at first');
    component.onCollapseDone.subscribe(animationEvent => expect(animationEvent.removed).toBe(false));
    component.removeAlert();
    expect(component.remove).toBe(true, 'remove at click');
  });*/
});
