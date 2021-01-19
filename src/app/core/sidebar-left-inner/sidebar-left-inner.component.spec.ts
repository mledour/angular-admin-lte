import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarLeftInnerComponent } from './sidebar-left-inner.component';

describe('SidebarLeftInnerComponent', () => {
  let component: SidebarLeftInnerComponent;
  let fixture: ComponentFixture<SidebarLeftInnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarLeftInnerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLeftInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
