import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimationsModule } from '../animations/animations.module';
import { ColorModule } from '../color/color.module';

import { DropdownComponent, DropdownToggleComponent, DropdownMenuComponent } from './dropdown.component';

@NgModule({
    imports: [CommonModule, AnimationsModule, ColorModule],
    exports: [DropdownComponent, DropdownToggleComponent, DropdownMenuComponent],
    declarations: [DropdownComponent, DropdownToggleComponent, DropdownMenuComponent]
})
export class DropdownModule {}
