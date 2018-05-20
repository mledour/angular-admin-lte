import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLeftInnerComponent } from './sidebar-left-inner.component';

describe('SidebarLeftInnerComponent', () => {
  let component: SidebarLeftInnerComponent;
  let fixture: ComponentFixture<SidebarLeftInnerComponent>;

  beforeEach(async(() => {
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
