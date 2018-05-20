import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxInfoRoutingModule } from './box-info-routing.module';
import { BoxInfoComponent } from './box-info.component';

import { BoxModule, BoxInfoModule as MkBoxInfoModule } from 'angular-admin-lte';

@NgModule({
  imports: [
    CommonModule,
    BoxInfoRoutingModule,
    BoxModule,
    MkBoxInfoModule
  ],
  declarations: [BoxInfoComponent]
})
export class BoxInfoModule { }
