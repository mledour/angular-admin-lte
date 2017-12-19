import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxSmallRoutingModule } from './box-small-routing.module';
import { BoxSmallComponent } from './box-small.component';

import { BoxModule, BoxSmallModule as MkBoxSmallModule  } from '../../../../../src';

@NgModule({
  imports: [
    CommonModule,
    BoxSmallRoutingModule,
    BoxModule,
    MkBoxSmallModule
  ],
  declarations: [BoxSmallComponent]
})
export class BoxSmallModule { }
