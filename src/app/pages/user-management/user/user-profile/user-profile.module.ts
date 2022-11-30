import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { PageLayoutModule } from '../../../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import {UserProfileComponent} from './user-profile.component';
@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatTabsModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule
  ]
})
export class UserProfileModule { }
