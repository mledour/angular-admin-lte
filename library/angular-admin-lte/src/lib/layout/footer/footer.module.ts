import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent, FooterLeftComponent, FooterRightComponent } from './footer.component';

@NgModule({
    imports: [CommonModule],
    exports: [FooterComponent, FooterLeftComponent, FooterRightComponent],
    declarations: [FooterComponent, FooterLeftComponent, FooterRightComponent]
})
export class FooterModule { }
