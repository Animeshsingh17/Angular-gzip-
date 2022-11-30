import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingListComponent } from './pending-list.component';
import { PendingListRoutingModule } from './pending-list-routing.module';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
    declarations: [PendingListComponent],
    imports: [
        CommonModule,
        PendingListRoutingModule,
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
        MatFormFieldModule
    ]
})
export class PendingListModule {

}