import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SecondaryToolbarModule } from '../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { UserComponent } from './user.component';
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
import { UserCreateUpdateModule } from './user-create-update/user-create-update.module'
import { DeleteDialogsComponentModule } from '../../universal-component/delete-dialogs-component/delete-dialogs-component.module';
import { UserPasswordUpdateModule } from './user-password-update/user-password-update.module';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FlexLayoutModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    PageLayoutModule,
    UserCreateUpdateModule,
    DeleteDialogsComponentModule,
    UserPasswordUpdateModule,
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
    MatDialogModule
  ]
})
export class UserModule { }
