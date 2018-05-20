import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimationsModule } from '../animations/animations.module';
import { ColorModule } from '../color/color.module';

import { BoxHeaderDirective, BoxContentDirective, BoxFooterDirective, BoxToolsDirective } from './box.directive';
import { BoxComponent } from './box.component';


@NgModule({
    imports: [CommonModule,  AnimationsModule, ColorModule],
    exports: [BoxComponent, BoxHeaderDirective, BoxContentDirective, BoxFooterDirective, BoxToolsDirective],
    declarations: [BoxComponent, BoxHeaderDirective, BoxContentDirective, BoxFooterDirective, BoxToolsDirective]
})
export class BoxModule {}
