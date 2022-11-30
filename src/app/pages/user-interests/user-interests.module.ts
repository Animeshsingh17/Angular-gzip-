import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInterestsRoutingModule } from './user-interests-routing.module';
import { UserInterestsComponent } from './user-interests.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { SecondaryToolbarModule } from '../../../../src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../../src/@vex/components/breadcrumbs/breadcrumbs.module';
import { MatButtonModule } from '@angular/material/button';
import { PageLayoutModule } from '../../../../src/@vex/components/page-layout/page-layout.module';
import { ContainerModule } from '../../../../src/@vex/directives/container/container.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddInterestsModule } from "./add-interest/add-interests.module";
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {DeleteInterestModule} from './delete-interest/delete-interest.module';
import {UpdateCategoryModule} from './update-category/update-category.module';
@NgModule({
  declarations: [UserInterestsComponent],
  imports: [
    CommonModule,
    UserInterestsRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    IconModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    MatButtonModule,
    PageLayoutModule,
    ContainerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    AddInterestsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    DeleteInterestModule,
    UpdateCategoryModule
    
  ]
})
export class UserInterestsModule {
}
