import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarRightInnerComponent } from './sidebar-right-inner.component';
import { TabsModule, LayoutModule } from 'angular-admin-lte';

describe('SidebarRightInnerComponent', () => {
  let component: SidebarRightInnerComponent;
  let fixture: ComponentFixture<SidebarRightInnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        LayoutModule.forRoot(null),
        TabsModule
      ],
      declarations: [SidebarRightInnerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRightInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
