import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextComponent } from './input-text.component';
import { InputTextLabelDirective, InputTextAddonLeftDirective, InputTextAddonRightDirective } from './input-text.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [InputTextComponent, InputTextLabelDirective, InputTextAddonLeftDirective, InputTextAddonRightDirective],
  declarations: [InputTextComponent, InputTextLabelDirective, InputTextAddonLeftDirective, InputTextAddonRightDirective]
})
export class InputTextModule {}
