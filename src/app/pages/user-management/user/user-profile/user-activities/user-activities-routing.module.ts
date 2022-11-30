import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserActivitiesComponent } from './user-activities.component';

const routes: Routes = [
  {
    path: '',
    component: UserActivitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActivitiesRoutingModule { }
