import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPermissionRoutingModule } from './user-permission-routing.module';
import { UserPermissionComponent } from './user-permission.component';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {ReactiveFormsModule} from '@angular/forms'
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [UserPermissionComponent],
  exports: [
    UserPermissionComponent
  ],
  imports: [
    CommonModule,
    UserPermissionRoutingModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    IconModule,
    MatDividerModule,
    MatIconModule,
    MatRadioModule,
    
  ]
})
export class UserPermissionModule { }
