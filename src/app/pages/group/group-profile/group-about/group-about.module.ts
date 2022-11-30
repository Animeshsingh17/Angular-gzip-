import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupAboutRoutingModule } from './group-about-routing.module';
import { GroupAboutComponent } from './group-about.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [GroupAboutComponent],
  imports: [
    CommonModule,
    GroupAboutRoutingModule,
    MatIconModule,
    IconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule
  ]
})
export class GroupAboutModule { }
