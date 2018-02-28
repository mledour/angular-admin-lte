import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomRoutingModule } from './custom-routing.module';
import { CustomComponent } from './custom.component';

import { BoxModule } from '../../../../../src';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CustomRoutingModule,
    BoxModule
  ],
  declarations: [CustomComponent]
})
export class CustomModule { }
