import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxSmallComponent } from './box-small.component';

const routes: Routes = [{
  path: '',
  component: BoxSmallComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxSmallRoutingModule { }
