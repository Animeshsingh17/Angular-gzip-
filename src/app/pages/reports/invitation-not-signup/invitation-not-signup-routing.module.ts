import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationNotSignupComponent } from './invitation-not-signup.component';


const routes: Routes = [
  {
    path: '',
    component: InvitationNotSignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitationNotSignupRoutingModule {
}
