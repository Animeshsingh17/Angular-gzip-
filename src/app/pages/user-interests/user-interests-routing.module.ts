import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInterestsComponent } from './user-interests.component';


const routes: Routes = [
  {
    path: '',
    component: UserInterestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInterestsRoutingModule {
}
