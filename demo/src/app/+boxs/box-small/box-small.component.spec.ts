import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSmallComponent } from './box-small.component';

describe('BoxSmallComponent', () => {
  let component: BoxSmallComponent;
  let fixture: ComponentFixture<BoxSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
