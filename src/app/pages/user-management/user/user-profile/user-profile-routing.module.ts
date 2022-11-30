import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import {VexRoutes} from '../../../../../@vex/interfaces/vex-route.interface';
const routes: VexRoutes = [{
  path: '',
  component: UserProfileComponent,
  data: {
    toolbarShadowEnabled: true,
    containerEnabled: true
  },
  children: [
    {
      path: '',
      loadChildren: () => import('./user-about/user-about.module').then(m => m.UserAboutModule)
    },
    {
      path: 'connection',
      loadChildren: () => import('./user-connection/user-connection.module').then(m => m.UserConnectionModule)
    },
    {
      path: 'pendingConnection',
      loadChildren: () => import('./user-pending-connection/user-pending-connection.module').then(m => m.UserPendingConnectionModule)
    },
    {
      path: 'userActivities',
      loadChildren: () => import('./user-activities/user-activities.module').then(m => m.UserActivitiesModule)
    },
    {
      path: 'userInternet',
      loadChildren: () => import('./user-interest/user-interest.module').then(m => m.UserInterestModule)
    },
    {
      path: 'userPermissions',
      loadChildren: () => import('./user-permission/user-permission.module').then(m => m.UserPermissionModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
