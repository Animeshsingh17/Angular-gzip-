import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupTimelineComponent } from './group-timeline.component'
const routes: Routes = [
  {
    path: '',
    component: GroupTimelineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupTimelineRoutingModule { }
