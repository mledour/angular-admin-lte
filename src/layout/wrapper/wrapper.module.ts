import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrapperComponent } from './wrapper.component';

@NgModule({
    imports: [CommonModule],
    exports: [WrapperComponent],
    declarations: [WrapperComponent]
})
export class WrapperModule {}
