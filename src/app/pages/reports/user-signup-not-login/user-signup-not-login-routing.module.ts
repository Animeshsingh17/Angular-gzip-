import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSignupNotLoginComponent } from './user-signup-not-login.component';


const routes: Routes = [
  {
    path: '',
    component: UserSignupNotLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSignupNotLoginRoutingModule {
}
