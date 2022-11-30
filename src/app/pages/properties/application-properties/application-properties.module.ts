import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationPropertiesRoutingModule } from './application-properties-routing.module';
import { SecondaryToolbarModule } from '../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { ApplicationPropertiesComponent } from './application-properties.component';
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
import { MatFormFieldDefaultOptions, MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { UpdateApplicationPropertiesUpdateModule } from '../update-application-properties/update-application-properties.module'

@NgModule({
  declarations: [ApplicationPropertiesComponent],
  imports: [
    CommonModule,
    ApplicationPropertiesRoutingModule,
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
        UpdateApplicationPropertiesUpdateModule,
        MatSelectModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class ApplicationPropertiesModule { }
