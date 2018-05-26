import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {ColorModule} from '../../color/color.module';

import {InputGroupComponent} from './input-group.component';
import {
  InputGroupAddonLeftDirective,
  InputGroupAddonRightDirective,
  InputGroupContentDirective,
  InputGroupLabelDirective
} from './input-group.directive';

@NgModule({
  imports: [
    CommonModule,
    ColorModule,
    FormsModule
  ],
  exports: [InputGroupComponent, InputGroupLabelDirective, InputGroupAddonLeftDirective,
    InputGroupAddonRightDirective, InputGroupContentDirective],
  declarations: [InputGroupComponent, InputGroupLabelDirective, InputGroupAddonLeftDirective,
    InputGroupAddonRightDirective, InputGroupContentDirective]
})
export class InputGroupModule {}
