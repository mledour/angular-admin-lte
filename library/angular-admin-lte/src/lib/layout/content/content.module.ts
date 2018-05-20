import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { ContentComponent } from './content.component';

@NgModule({
    imports: [CommonModule, RouterModule, BreadcrumbsModule],
    exports: [ContentComponent],
    declarations: [ContentComponent]
})
export class ContentModule {}
