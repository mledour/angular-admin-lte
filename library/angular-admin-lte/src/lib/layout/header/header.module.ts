import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent, HeaderLogoComponent, HeaderLogoMiniComponent } from './header.component';


@NgModule({
    imports: [CommonModule, RouterModule ],
    exports: [HeaderComponent, HeaderLogoComponent, HeaderLogoMiniComponent],
    declarations: [HeaderComponent, HeaderLogoComponent, HeaderLogoMiniComponent]
})
export class HeaderModule { }
