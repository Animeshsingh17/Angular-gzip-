import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInteractionLocationComponent } from './user-interaction-location.component';

const routes: Routes = [
  {
    path: '',
    component: UserInteractionLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInteractionLocationRoutingModule { }
