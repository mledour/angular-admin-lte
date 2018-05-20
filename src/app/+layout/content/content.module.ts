import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';

import { BoxModule } from 'angular-admin-lte';

@NgModule({
  imports: [
    CommonModule,
    ContentRoutingModule,
    BoxModule
  ],
  declarations: [ContentComponent]
})
export class ContentModule { }
