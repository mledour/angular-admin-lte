import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DisableRoutingModule } from './disable-routing.module';
import { DisableComponent } from './disable.component';

import { BoxModule } from '../../../../../src';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DisableRoutingModule,
    BoxModule
  ],
  declarations: [DisableComponent]
})
export class DisableModule { }
