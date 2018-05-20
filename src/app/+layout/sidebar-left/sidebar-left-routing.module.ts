import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarLeftComponent } from './sidebar-left.component';

const routes: Routes = [{
  path: '',
  component: SidebarLeftComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarLeftRoutingModule { }
