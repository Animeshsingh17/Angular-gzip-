import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserInterestComponent} from './user-interest.component';

const routes: Routes = [
  {
    path: '',
    component: UserInterestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInterestRoutingModule { }
