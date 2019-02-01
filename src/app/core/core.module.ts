import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BoxModule, TabsModule, DropdownModule } from 'angular-admin-lte';

import { HeaderInnerComponent } from './header-inner/header-inner.component';
import { SidebarLeftInnerComponent } from './sidebar-left-inner/sidebar-left-inner.component';
import { SidebarRightInnerComponent } from './sidebar-right-inner/sidebar-right-inner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    TabsModule,
    BoxModule
  ],
  declarations: [HeaderInnerComponent, SidebarLeftInnerComponent, SidebarRightInnerComponent],
  exports: [BoxModule, TabsModule, HeaderInnerComponent, SidebarLeftInnerComponent, SidebarRightInnerComponent]
})
export class CoreModule { }
