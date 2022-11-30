import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupProfileRoutingModule } from './group-profile-routing.module';
import { GroupProfileComponent } from './group-profile.component';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { GroupAboutModule } from "./group-about/group-about.module";
import { GroupPendingConnectionModule } from "./group-pending-connection/group-pending-connection.module";
@NgModule({
  declarations: [GroupProfileComponent],
  imports: [
    CommonModule,
    GroupProfileRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatTabsModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    GroupAboutModule,
    GroupPendingConnectionModule
  ]
})
export class GroupProfileModule { }
