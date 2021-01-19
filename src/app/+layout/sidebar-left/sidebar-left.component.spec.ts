import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarLeftComponent } from './sidebar-left.component';

import { BoxModule } from 'angular-admin-lte';

describe('SidebarLeftComponent', () => {
  let component: SidebarLeftComponent;
  let fixture: ComponentFixture<SidebarLeftComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ BoxModule ],
      declarations: [ SidebarLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
