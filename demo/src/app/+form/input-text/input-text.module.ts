import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextRoutingModule } from './input-text-routing.module';
import { InputTextComponent } from './input-text.component';

import { InputTextModule as mkInputTextModule } from '../../../../../src';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextRoutingModule,
    mkInputTextModule
  ],
  declarations: [InputTextComponent]
})
export class InputTextModule { }
