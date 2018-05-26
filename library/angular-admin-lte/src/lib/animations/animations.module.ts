import { NgModule } from '@angular/core';

import { CollapseAnimationDirective } from './animations.directive';


@NgModule({
    exports: [CollapseAnimationDirective],
    declarations: [CollapseAnimationDirective]
})
export class AnimationsModule {}
