import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from '../@vex/interfaces/vex-route.interface';
import { AuthGuard } from './core/guards/auth.guard';
// import { ReportsModule } from './pages/reports/reports.module';

const routes: VexRoutes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/pages/auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/pages/auth/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path: '',
    component: CustomLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        redirectTo: '/'
      },
      {
        path: '',
        loadChildren: () => import('./pages/dashboards/dashboard-analytics/dashboard-analytics.module').then(m => m.DashboardAnalyticsModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/user-management/user/user.module').then(m => m.UserModule),
      },
      {
        path: 'reports/activity',
        loadChildren: () => import('./pages/reports/activity/activity.module').then(m => m.ActivityModule),
      },
      {
        path: 'reports/lastActivity',
        loadChildren: () => import('./pages/reports/last-activity/last-activity.module').then(m => m.LastActivityModule),
      },
      {
        path: 'reports/pendingList',
        loadChildren: () => import('./pages/reports/pending-list/pending-list.module').then(m => m.PendingListModule),
      },
      {
        path: 'reports/invitationNotSignup',
        loadChildren: () => import('./pages/reports/invitation-not-signup/invitation-not-signup.module').then(m => m.InvitationNotSignupModule),
      },
      {
        path: 'reports/userSignupNotLogin',
        loadChildren: () => import('./pages/reports/user-signup-not-login/user-signup-not-login.module').then(m => m.UserSignupNotLoginModule),
      },
      {
        path: 'reports/userInteractionWithCurrentLocation',
        loadChildren: () => import('./pages/reports/user-interaction-location/user-interaction-location.module').then(m => m.UserInteractionLocationModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/user-management/user/user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      {
        path: 'notifications/adminNotifications',
        loadChildren: () => import('./pages/notifications/admin-notifications/admin-notification.module').then(m => m.AdminNotificationModule)
      },
      {
        path: 'notifications/userNotifications',
        loadChildren: () => import('./pages/notifications/user-notifications/user-notification.module').then(m => m.UserNotificationModule)
      },
      {
        path: 'properties/application',
        loadChildren: () => import('./pages/properties/application-properties/application-properties.module').then(m => m.ApplicationPropertiesModule)
      },
      {
        path: 'properties/message',
        loadChildren: () => import('./pages/properties/message-properties/message-properties.module').then(m => m.MessagePropertiesModule)
      },
      {
        path: 'circle',
        loadChildren: () => import('./pages/group/group.module').then(m => m.GroupModule)
      }, 
      {
        path: 'circleProfile',
        loadChildren: () => import('./pages/group/group-profile/group-profile.module').then(m=>m.GroupProfileModule)
      },
      {
        path: 'userInterest',
        loadChildren: () => import('./pages/user-interests/user-interests.module').then(m => m.UserInterestsModule)
      },
      {
        path: 'userRegistration',
        loadChildren: () => import('./pages/user-registration/user-registration.module').then(m => m.UserRegistrationModule)
      },
      {
        path: 'recommendeduser',
        loadChildren: () => import('./pages/recommended-user/recommended-user.module').then(m => m.RecommendedUserModule)
      },
      {
        path: '**',
        loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
