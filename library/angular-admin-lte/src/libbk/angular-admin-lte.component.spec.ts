import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularAdminLteComponent } from './angular-admin-lte.component';

describe('AngularAdminLteComponent', () => {
  let component: AngularAdminLteComponent;
  let fixture: ComponentFixture<AngularAdminLteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularAdminLteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularAdminLteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
