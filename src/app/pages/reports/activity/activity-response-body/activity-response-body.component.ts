import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
  selector: 'theLunchCircle-activity-response-body',
  templateUrl: './activity-response-body.component.html',
  styleUrls: ['./activity-response-body.component.scss']
})
export class ActivityResponseBodyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  private dialogRef: MatDialogRef<ActivityResponseBodyComponent>) { 
    
  }
  icClose= icClose;
  ngOnInit(): void {
    
  }

}
