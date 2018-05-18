import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputTextComponent } from './input-text.component';

const routes: Routes = [{
  path: '',
  component: InputTextComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputTextRoutingModule { }
