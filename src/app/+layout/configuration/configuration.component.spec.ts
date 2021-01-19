import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigurationComponent } from './configuration.component';

import { BoxModule } from 'angular-admin-lte';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ BoxModule ],
      declarations: [ ConfigurationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
