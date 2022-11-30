import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
  selector: 'vex-delete-dialogs-component',
  templateUrl: './delete-dialogs-component.component.html',
  styleUrls: ['./delete-dialogs-component.component.scss']
})
export class DeleteDialogsComponentComponent implements OnInit {
  icClose = icClose;
  title = "";
  body = "";
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<DeleteDialogsComponentComponent>,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.title = this.defaults.title;
    this.body = this.defaults.body;
  }
  close(answer: string) {
    this.dialogRef.close(answer);
  }

}
