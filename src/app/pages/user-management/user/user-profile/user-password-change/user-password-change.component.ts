import { ChangeDetectorRef, Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { environment } from 'src/environments/environment';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import baselineLock from '@iconify/icons-ic/baseline-lock';

export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
@Component({
  selector: 'vex-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.scss']
})
export class UserPasswordChangeComponent extends AppComponentBase implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  form: FormGroup;
  inputType = 'password';
  visible = false;
  mode: 'create' | 'update' = 'create';
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  icMoreVert = icMoreVert;
  icClose = icClose;
  icPassword = baselineLock;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  private dialogRef: MatDialogRef<UserPasswordChangeComponent>,
  private fb: FormBuilder,private cd: ChangeDetectorRef, injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      _key: this.defaults._key ||'',
      oldpassword:new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      userId:this.authenticationService.currentUserId,
      imageSrc:this.defaults.imageSrc||'',
      firstName:new FormControl(this.defaults.firstName||'',[Validators.required]),
      lastName:this.defaults.lastName||'',
      password:new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      confirmPassword:new FormControl('',[Validators.required]),
    },
    { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  save() {
    this.updateUserPassword();
  }
  updateUserPassword() {
    const user = this.form.value;
    this.blockUI.start();
    // this.apiService.post(environment.baseurl.arangoDb + AppConsts.userUpdatePassword, {
    //   "_key": user._key,
    //   "userId": user.userId,
    //   "currentPassword":user.oldpassword,
    //   "newPassword": user.password
    //    }).subscribe(async (result: any) => {
      this.dialogRef.close(user);
      this.blockUI.stop();
    // }, error => {
    //   this.blockUI.stop();
    //   return error;
    // });
  }
  get f(){
    return this.form.controls;
  }
  togglePassword() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

}

