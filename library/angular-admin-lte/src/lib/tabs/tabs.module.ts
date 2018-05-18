import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorModule } from '../color/color.module';

import { TabToggleDirective } from './tabs.directive';
import { TabsComponent, TabsHeaderComponent, TabComponent, TabHeaderComponent, TabContentComponent } from './tabs.component';

@NgModule({
    imports: [CommonModule, ColorModule],
    exports: [TabsComponent, TabsHeaderComponent, TabComponent, TabHeaderComponent, TabContentComponent],
    declarations: [TabToggleDirective, TabsComponent, TabsHeaderComponent, TabComponent, TabHeaderComponent, TabContentComponent]
})
export class TabsModule {}
