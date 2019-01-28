import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextComponent } from './input-text.component';

import { BoxModule, InputGroupModule, InputTextModule } from 'angular-admin-lte';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, NgControl } from '@angular/forms';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BoxModule,
        InputGroupModule,
        InputTextModule
      ],
      declarations: [ InputTextComponent ],
      providers: [
        FormBuilder,
        NgControl
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
