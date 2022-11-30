import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupConnectionComponent } from "./group-connection.component";
const routes: Routes = [
  {
    path: '',
    component: GroupConnectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupConnectionRoutingModule { }
