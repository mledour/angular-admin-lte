import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxInfoComponent } from './box-info.component';

const routes: Routes = [{
  path: '',
  component: BoxInfoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxInfoRoutingModule { }
