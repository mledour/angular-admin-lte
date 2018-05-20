import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';

import { BoxModule } from 'angular-admin-lte';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BoxModule ],
      declarations: [ ContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
