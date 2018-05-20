import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownRoutingModule } from './dropdown-routing.module';
import { DropdownComponent } from './dropdown.component';

import { BoxModule, DropdownModule as mkDropdownModule } from '../../../../lib';

@NgModule({
  imports: [
    CommonModule,
    DropdownRoutingModule,
    BoxModule,
    mkDropdownModule
  ],
  declarations: [DropdownComponent]
})
export class DropdownModule { }
