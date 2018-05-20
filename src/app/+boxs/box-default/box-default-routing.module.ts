import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxDefaultComponent } from './box-default.component';

const routes: Routes = [{
  path: '',
  component: BoxDefaultComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxDefaultRoutingModule { }
