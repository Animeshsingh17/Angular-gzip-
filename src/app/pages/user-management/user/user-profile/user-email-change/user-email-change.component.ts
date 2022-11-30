import { ChangeDetectorRef, Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import icClose from '@iconify/icons-ic/twotone-close';
import roundEmail from '@iconify/icons-ic/round-email';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
@Component({
  selector: 'theLunchCircle-user-email-change',
  templateUrl: './user-email-change.component.html',
  styleUrls: ['./user-email-change.component.scss']
})
export class UserEmailChangeComponent extends AppComponentBase implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  form: FormGroup;
  icClose = icClose;
  icRoundEmail = roundEmail;
  mode: 'create' | 'update' = 'create';
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<UserEmailChangeComponent>,
    private fb: FormBuilder, private cd: ChangeDetectorRef, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: this.defaults.userId,
      imageSrc: this.defaults.userPhotoUrl || '',
      firstName: this.defaults.firstName || '',
      lastName: this.defaults.lastName || '',
      email: this.defaults.email || ''
    });
  }

  save() {
    const user = this.form.value;
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.userEmailChange, {
      "userId": user.userId,
      "email": user.email
    }).subscribe(async (result: any) => {
      if (result?.success) {
        result.data=user;
        this.dialogRef.close(result);
      }
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      return error;
    });
  }
}
