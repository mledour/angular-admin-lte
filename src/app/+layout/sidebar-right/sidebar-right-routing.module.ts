import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarRightComponent } from './sidebar-right.component';

const routes: Routes = [{
  path: '',
  component: SidebarRightComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRightRoutingModule { }
