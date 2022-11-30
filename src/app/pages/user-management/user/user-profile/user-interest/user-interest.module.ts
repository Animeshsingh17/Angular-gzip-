import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInterestRoutingModule } from './user-interest-routing.module';
import { UserInterestComponent } from './user-interest.component';
import { SecondaryToolbarModule } from '../../../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from '../../../../../../@vex/components/page-layout/page-layout.module';
import { ContainerModule } from '../../../../../../@vex/directives/container/container.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogsComponentModule } from '../../../../universal-component/delete-dialogs-component/delete-dialogs-component.module';
import {AddUserConnectionModule} from '../add-user-connection/add-user-connection.module';
import {AddUserInterestModule} from '../add-user-interest/add-user-interest.module';
@NgModule({
  declarations: [UserInterestComponent],
  imports: [
    CommonModule,
    UserInterestRoutingModule,
    FlexLayoutModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    PageLayoutModule,
    IconModule,
    ContainerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDialogModule,
    DeleteDialogsComponentModule,
    AddUserConnectionModule,
    AddUserInterestModule
  ]
})
export class UserInterestModule { }
