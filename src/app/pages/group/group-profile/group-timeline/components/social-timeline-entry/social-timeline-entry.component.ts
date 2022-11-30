import { Component, Injector, Input, OnInit } from '@angular/core';
import icFavorite from '@iconify/icons-ic/twotone-favorite';
import icComment from '@iconify/icons-ic/twotone-comment';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { MatDialog } from '@angular/material/dialog';
import { ScrumboardDialogComponent } from '../scrumboard-dialog/scrumboard-dialog.component'
import icDelete from '@iconify/icons-ic/twotone-delete';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';


@Component({
  selector: 'vex-profile-timeline-entry',
  templateUrl: './social-timeline-entry.component.html',
  styleUrls: ['./social-timeline-entry.component.scss']
})
export class SocialTimelineEntryComponent extends AppComponentBase implements OnInit {

  @Input() avatarUrl: string;
  @Input() name: string;
  @Input() imageUrl: string;
  @Input() likes: number;
  @Input() comments: number;
  @Input() data: any;
  icFavorite = icFavorite;
  icComment = icComment;
  icDelete=icDelete;
  icMoreVert=icMoreVert;
  dataValue = {}
  constructor(injector: Injector, private dialog: MatDialog) {
    super(injector)
    this.dataValue = this.data;
   }

  ngOnInit(): void {
    
  }
  onCommentsClick(){
    this.dialog.open(ScrumboardDialogComponent,{
      data: this.data
    })
  }
  deletePost(){
  }
}
