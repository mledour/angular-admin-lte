import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSmallComponent } from './box-small.component';

import { BoxModule, BoxSmallModule as MkBoxSmallModule  } from 'angular-admin-lte';

describe('BoxSmallComponent', () => {
  let component: BoxSmallComponent;
  let fixture: ComponentFixture<BoxSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BoxModule,
        MkBoxSmallModule
      ],
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
