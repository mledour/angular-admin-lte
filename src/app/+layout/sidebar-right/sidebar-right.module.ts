import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRightRoutingModule } from './sidebar-right-routing.module';
import { SidebarRightComponent } from './sidebar-right.component';

import { BoxModule } from 'angular-admin-lte';

@NgModule({
  imports: [
    CommonModule,
    SidebarRightRoutingModule,
    BoxModule
  ],
  declarations: [SidebarRightComponent]
})
export class SidebarRightModule { }
