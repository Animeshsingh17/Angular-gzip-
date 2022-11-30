import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { GroupProfileComponent } from './group-profile.component';

const routes: VexRoutes = [{
  path: '',
  component: GroupProfileComponent,
  data: {
    toolbarShadowEnabled: true,
    containerEnabled: true
  },
  children: [
  {
    path: '',
    loadChildren: () => import('./group-about/group-about.module').then(m => m.GroupAboutModule) 
  },
  {
    path: 'connection',
    loadChildren: () => import('./group-connection/group-connection.module').then(m=>m.GroupConnectionModule)
  },
  {
    path: 'pendingConnection',
    loadChildren: () => import('./group-pending-connection/group-pending-connection.module').then(m=>m.GroupPendingConnectionModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./group-timeline/group-timeline.module').then(m=>m.GroupTimelineModule)
  }
]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupProfileRoutingModule { }
