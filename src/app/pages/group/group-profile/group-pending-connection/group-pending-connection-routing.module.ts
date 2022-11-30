import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupPendingConnectionComponent } from "./group-pending-connection.component";
const routes: Routes = [
  {
    path: '',
    component: GroupPendingConnectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPendingConnectionRoutingModule { }
