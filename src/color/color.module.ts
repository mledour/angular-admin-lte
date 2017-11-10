import { NgModule } from '@angular/core';

import { BackgroundColorDirective, ColorDirective } from './color.directive';

@NgModule({
    exports: [BackgroundColorDirective, ColorDirective],
    declarations: [BackgroundColorDirective, ColorDirective]
})
export class ColorModule {}
