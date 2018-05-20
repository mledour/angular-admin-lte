import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent, HeaderLogoComponent, HeaderLogoMiniComponent } from './header.component';

@NgModule({
    imports: [CommonModule],
    exports: [HeaderComponent, HeaderLogoComponent, HeaderLogoMiniComponent],
    declarations: [HeaderComponent, HeaderLogoComponent, HeaderLogoMiniComponent]
})
export class HeaderModule { }
