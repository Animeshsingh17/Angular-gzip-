import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAnalyticsRoutingModule } from './dashboard-analytics-routing.module';
import { DashboardAnalyticsComponent } from './dashboard-analytics.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { SecondaryToolbarModule } from '../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { MatButtonModule } from '@angular/material/button';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';


@NgModule({
  declarations: [DashboardAnalyticsComponent],
  imports: [
    CommonModule,
    DashboardAnalyticsRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    IconModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    MatButtonModule,
    PageLayoutModule,
    ContainerModule
  ]
})
export class DashboardAnalyticsModule {
}
