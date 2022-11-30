import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupTimelineRoutingModule } from './group-timeline-routing.module';
import { GroupTimelineComponent } from './group-timeline.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '@visurel/iconify-angular';
import { SocialTimelineEntryComponent } from './components/social-timeline-entry/social-timeline-entry.component';
import { TimeElapsedPipe } from '../../../../core/pipe/time-elapsed.pipe'
import { ScrumboardDialogModule } from './components/scrumboard-dialog/scrumboard-dialog.module'
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [GroupTimelineComponent, SocialTimelineEntryComponent,TimeElapsedPipe],
  imports: [
    CommonModule,
    GroupTimelineRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatIconModule,
    IconModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    ScrumboardDialogModule,
    MatMenuModule
  ]
})
export class GroupTimelineModule { }
