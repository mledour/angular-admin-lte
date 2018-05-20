import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropdownComponent } from './dropdown.component';

const routes: Routes = [{
  path: '',
  component: DropdownComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropdownRoutingModule { }
