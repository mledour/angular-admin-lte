import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxDefaultRoutingModule } from './box-default-routing.module';
import { BoxDefaultComponent } from './box-default.component';

import { BoxModule } from 'angular-admin-lte';

@NgModule({
  imports: [
    CommonModule,
    BoxDefaultRoutingModule,
    BoxModule
  ],
  declarations: [BoxDefaultComponent]
})
export class BoxDefaultModule { }
