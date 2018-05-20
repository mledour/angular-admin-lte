import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDefaultComponent } from './box-default.component';

import { BoxModule } from 'angular-admin-lte';

describe('BoxDefaultComponent', () => {
  let component: BoxDefaultComponent;
  let fixture: ComponentFixture<BoxDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BoxModule ],
      declarations: [ BoxDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
