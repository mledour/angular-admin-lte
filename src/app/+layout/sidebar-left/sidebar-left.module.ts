import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarLeftRoutingModule } from './sidebar-left-routing.module';
import { SidebarLeftComponent } from './sidebar-left.component';

import { BoxModule } from '../../../../../lib';

@NgModule({
  imports: [
    CommonModule,
    SidebarLeftRoutingModule,
    BoxModule
  ],
  declarations: [SidebarLeftComponent]
})
export class SidebarLeftModule { }
