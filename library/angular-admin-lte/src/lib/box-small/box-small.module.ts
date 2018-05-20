import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorModule } from '../color/color.module';

import { BoxSmallHeaderDirective, BoxSmallContentDirective, BoxSmallFooterDirective } from './box-small.directive';
import { BoxSmallComponent } from './box-small.component';

@NgModule({
    imports: [CommonModule, ColorModule],
    exports: [BoxSmallComponent, BoxSmallHeaderDirective, BoxSmallContentDirective, BoxSmallFooterDirective],
    declarations: [BoxSmallComponent, BoxSmallHeaderDirective, BoxSmallContentDirective, BoxSmallFooterDirective]
})
export class BoxSmallModule {}
