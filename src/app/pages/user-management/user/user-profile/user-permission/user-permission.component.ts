import { AfterViewInit, Component, Inject, Injector, OnInit } from '@angular/core';
import { fadeInUp400ms } from '../../../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../../../@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../../@vex/animations/scale-in.animation';
import { stagger40ms } from '../../../../../../@vex/animations/stagger.animation';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Helper } from 'src/app/core/helpers/helper';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { finalize } from 'rxjs/operators';
import baselineLock from '@iconify/icons-ic/baseline-lock';
import icWork from '@iconify/icons-ic/twotone-work';
import baselineEmojiObjects from '@iconify/icons-ic/baseline-emoji-objects';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import icClose from '@iconify/icons-ic/twotone-close';


@Component({
  selector: 'theLunchCircle-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class UserPermissionComponent extends AppComponentBase implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  baselineLock = baselineLock;
  baselineEmojiObjects = baselineEmojiObjects;
  icWork = icWork;
  icClose = icClose;
  user: any = {};
  userPer;
  ispromoted = false;
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any, injector: Injector, private dialogRef: MatDialogRef<UserPermissionComponent>, private dialog: MatDialog, private activatedRouter: ActivatedRoute, private fb: FormBuilder) {
    super(injector);

  }
  ngOnInit() {
    this.form = this.fb.group({
      firstName: [this.defaults.firstName + " " + this.defaults.lastName || null],
      userId: [this.defaults.userId],
      permission: [this.defaults.userPermission || null],
      isPromoted: [this.defaults.isPromoted || false],
      isLCFlag: [false],
    });
    if (this.defaults.userPermission === 'Lunch Circle') {
      if (this.defaults.lcflag) {
        this.form.patchValue({
          isLCFlag: false
        });
      }
      else{
        this.form.patchValue({
          isLCFlag: true
        });
      }
    }
  }
  SaveMemberSetting() {
    const memberpermission = this.form.value;
    delete memberpermission['firstName'];
    if (memberpermission.permission === 'Lunch Circle') {
      memberpermission.permission = 'LC';
      if (memberpermission.isLCFlag) {
        memberpermission.isLCFlag = false;
      }
      else {
        memberpermission.isLCFlag = true;
      }
    }
    else {
      memberpermission.permission = 'DC'
      memberpermission.isPromoted = false;
      memberpermission.isLCFlag = true;
    }
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.changeUserSetting, memberpermission).subscribe(async (result: any) => {
      result['data'] = memberpermission;
      this.dialogRef.close(result);
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      return error;
    });
  }
}
