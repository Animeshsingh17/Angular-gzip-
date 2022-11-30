import { ChangeDetectorRef } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import baselineLock from '@iconify/icons-ic/baseline-lock';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiService } from 'src/app/core/services/apiService/apiservice.service';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'vex-user-password-update',
  templateUrl: './user-password-update.component.html',
  styleUrls: ['./user-password-update.component.scss']
})
export class UserPasswordUpdateComponent implements OnInit {
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
  email: string;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  private dialogRef: MatDialogRef<UserPasswordUpdateComponent>,
  private fb: FormBuilder,private cd: ChangeDetectorRef,private apiService: ApiService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: this.defaults.userId ||'',
      userPhotoUrl:this.defaults.userPhotoUrl||'',
      firstName:new FormControl(this.defaults.firstName||'',[Validators.required]),
      lastName:this.defaults.lastName||'',
      password:new FormControl('',[Validators.required]),
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
    delete user['confirmPassword'];
    delete user['firstName'];
    delete user['lastName'];
    delete user['userPhotoUrl'];
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.changePassword, user).subscribe(async (result: any) => {
      this.dialogRef.close(result);
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      return error;
    });
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
