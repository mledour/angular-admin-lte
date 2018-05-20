import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';

import { TabsModule as MkTabsModule, BoxModule, DropdownModule } from 'angular-admin-lte';

@NgModule({
  imports: [
    CommonModule,
    TabsRoutingModule,
    MkTabsModule,
    BoxModule,
    DropdownModule
  ],
  declarations: [TabsComponent]
})
export class TabsModule { }
