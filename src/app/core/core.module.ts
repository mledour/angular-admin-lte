import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BoxModule, TabsModule, DropdownModule } from 'angular-admin-lte';

import { HeaderInnerComponent } from './header-inner/header-inner.component';
import { SidebarLeftInnerComponent } from './sidebar-left-inner/sidebar-left-inner.component';
import { SidebarRightInnerComponent } from './sidebar-right-inner/sidebar-right-inner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DropdownModule,
    TabsModule,
    BoxModule
  ],
  declarations: [HeaderInnerComponent, SidebarLeftInnerComponent, SidebarRightInnerComponent],
  exports: [BoxModule, TabsModule, HeaderInnerComponent, SidebarLeftInnerComponent, SidebarRightInnerComponent]
})
export class CoreModule { }
