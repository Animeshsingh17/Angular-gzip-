import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPendingConnectionComponent } from './user-pending-connection.component';

const routes: Routes = [
  {
    path: '',
    component: UserPendingConnectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPendingConnectionRoutingModule { }
