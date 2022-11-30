import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupAboutComponent } from "./group-about.component";
const routes: Routes = [
  {
    path: '',
    component: GroupAboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupAboutRoutingModule { }
