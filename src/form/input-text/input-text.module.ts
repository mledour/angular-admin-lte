import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextComponent } from './input-text.component';
import { InputTextAddonLeftDirective, InputTextAddonRightDirective } from './input-text.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [InputTextComponent, InputTextAddonLeftDirective, InputTextAddonRightDirective],
  declarations: [InputTextComponent, InputTextAddonLeftDirective, InputTextAddonRightDirective]
})
export class InputTextModule {}
