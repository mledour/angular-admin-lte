import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';

import { BoxModule } from 'angular-admin-lte';

@NgModule({
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    BoxModule
  ],
  declarations: [ConfigurationComponent]
})
export class ConfigurationModule { }
