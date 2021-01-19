import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoxInfoComponent } from './box-info.component';

import { BoxModule, BoxInfoModule } from 'angular-admin-lte';

describe('BoxInfoComponent', () => {
  let component: BoxInfoComponent;
  let fixture: ComponentFixture<BoxInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BoxModule,
        BoxInfoModule
      ],
      declarations: [ BoxInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
