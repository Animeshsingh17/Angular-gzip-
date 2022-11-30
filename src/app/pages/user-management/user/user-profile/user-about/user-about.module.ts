import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAboutRoutingModule } from './user-about-routing.module';
import { UserAboutComponent } from './user-about.component';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { UserCreateUpdateModule } from '../../user-create-update/user-create-update.module';
import { UserPasswordChangeModule } from '../user-password-change/user-password-change.module';
import { UserPasswordUpdateModule } from '../../user-password-update/user-password-update.module';
import {UserEmailChangeModule} from '../user-email-change/user-email-change.module';

@NgModule({
  declarations: [UserAboutComponent],
  exports: [
    UserAboutComponent
  ],
  imports: [
    CommonModule,
    UserAboutRoutingModule,
    MatIconModule,
    UserCreateUpdateModule,
    UserPasswordChangeModule,
    UserEmailChangeModule,
    IconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    UserPasswordUpdateModule
  ]
})
export class UserAboutModule { }
