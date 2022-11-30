import { ChangeDetectorRef, Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { environment } from 'src/environments/environment';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
  selector: 'theLunchCircle-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ],
})

export class NotificationsComponent extends AppComponentBase implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  icMoreVert = icMoreVert;
  file: File;
  messageType="Invitation";
  userId="";
  groupId="";
  constructor(private cd: ChangeDetectorRef, injector: Injector, @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<NotificationsComponent>, private fb: FormBuilder) {
    super(injector)
  }

  icClose = icClose;
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  target = 'LunchCircle';
  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';

    }
    else {
      this.defaults = {}
    }
    this.form = this.fb.group({
      title: [this.defaults.title || null],
      body: [this.defaults.body || null],
    });
    this.messageType=this.defaults.messageType;
    this.userId=this.defaults.userId;
    this.groupId=this.defaults.groupId;
  }
  sendNotification() {
    let formData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.sendNotificationByTopicWithImage
      + '?target=' + this.target + '&body=' + this.form.value.body + '&title='
      + this.form.value.title + '&messageType=' + this.messageType+'&userId='+this.userId+'&groupId='+this.groupId, formData).subscribe(async (result: any) => {
        this.blockUI.stop();
        this.notificationService.open('Notifications sent successfully', 'success', 1000);
        this.dialogRef.close(result)
      }, error => {
        this.blockUI.stop();
        return error;
      });
  }
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
  onFileChanged(event) {
    this.file = event.target.files[0];
  }
}
