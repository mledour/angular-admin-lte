import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertRoutingModule } from './alert-routing.module';
import { AlertComponent } from './alert.component';

import { AlertModule as MkAlertModule, BoxModule } from 'angular-admin-lte';

@NgModule({
  imports: [
    CommonModule,
    AlertRoutingModule,
    MkAlertModule,
    BoxModule
  ],
  declarations: [AlertComponent]
})
export class AlertModule { }
