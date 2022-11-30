import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserAboutComponent} from './user-about.component';

const routes: Routes = [
  {
    path: '',
    component: UserAboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAboutRoutingModule { }
