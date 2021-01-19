import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarRightComponent } from './sidebar-right.component';

import { BoxModule } from 'angular-admin-lte';

describe('SidebarRightComponent', () => {
  let component: SidebarRightComponent;
  let fixture: ComponentFixture<SidebarRightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ BoxModule ],
      declarations: [ SidebarRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
