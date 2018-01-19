import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisableComponent } from './disable.component';

const routes: Routes = [{
  path: '',
  component: DisableComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisableRoutingModule { }
