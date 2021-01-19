import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';

import { BoxModule, DropdownModule } from 'angular-admin-lte';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BoxModule,
        DropdownModule
      ],
      declarations: [ DropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
