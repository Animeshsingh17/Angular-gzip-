import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { SecondaryToolbarModule } from '../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from '../../../@vex/components/page-layout/page-layout.module';
import { ContainerModule } from '../../../@vex/directives/container/container.module';
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
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule } from '@angular/material/form-field';
import { CreateUpdateGroupModule } from "./create-update-group/create-update-group.module";
import { AddConnectionModule } from "./add-connection/add-connection.module";
import { RemoveConnectionModule } from "./remove-connection/remove-connection.module";
import { GroupProfileModule } from "./group-profile/group-profile.module";
import { UploadFileModule } from "../universal-component/upload-file/upload-file.module";
@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
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
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    CreateUpdateGroupModule,
    AddConnectionModule,
    RemoveConnectionModule,
    GroupProfileModule,
    UploadFileModule
  ]
})
export class GroupModule { }
