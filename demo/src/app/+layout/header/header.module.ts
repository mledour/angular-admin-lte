import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';

import { BoxModule } from '../../../../../src';

@NgModule({
  imports: [
    CommonModule,
    HeaderRoutingModule,
    BoxModule
  ],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
