import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaxRangeDirective, UserActivitiesComponent} from './user-activities.component';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivityResponseBodyModule } from 'src/app/pages/reports/activity/activity-response-body/activity-response-body.module';
import { UserActivitiesRoutingModule } from './user-activities-routing.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [UserActivitiesComponent,MaxRangeDirective],
  imports: [
    CommonModule,
    UserActivitiesRoutingModule,
    FlexLayoutModule,
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
    ActivityResponseBodyModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    DatePipe
  ]
})
export class UserActivitiesModule { }
