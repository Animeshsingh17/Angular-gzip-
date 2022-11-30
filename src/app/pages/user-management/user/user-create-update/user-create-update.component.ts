import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import roundEmail from '@iconify/icons-ic/round-email';
import baselineLock from '@iconify/icons-ic/baseline-lock';
import { User } from '../interfaces/user.model';
import baselineDomain from '@iconify/icons-ic/baseline-domain';
import twotonePsychology from '@iconify/icons-ic/twotone-psychology';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiService } from 'src/app/core/services/apiService/apiservice.service';
import { Helper } from 'src/app/core/helpers/helper';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
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
export interface Brand {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'vex-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  icCompany = baselineDomain;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  icMoreVert = icMoreVert;
  icClose = icClose;
  icPassword = baselineLock;
  icUserRole = twotonePsychology;
  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;
  icRoundEmail = roundEmail;
  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  inputType = 'password';
  visible = false;
  companys: any[] = [];
  roles: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
    private fb: FormBuilder, private cd: ChangeDetectorRef, private apiService: ApiService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
      this.form = this.fb.group({
        countryCode: [this.defaults.countryCode || null],
        userId: [this.defaults.userId || null],
        imageSrc: [this.defaults.userPhotoURL || null],
        email: [this.defaults.email || '', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        title: [this.defaults.title || null],
        firstName: [this.defaults.firstName || '', Validators.required],
        middleName: [this.defaults.middleName || ''],
        lastName: [this.defaults.lastName || '', Validators.required],
        gender: [this.defaults.gender || null],
        dateOfBirth: [this.defaults.dateOfBirth || null],
        mobileNumber: [this.defaults.mobileNumber || ''],
        companyName: [this.defaults.companyName || ''],
        headLine: [this.defaults.headLine || null],
        jobTitle: [this.defaults.jobTitle || null],
        qualifications: [this.defaults.qualifications || null],
        homeLocation: [this.defaults.homeLocation || null],
        fullBio: [this.defaults.fullBio || null]
      });
    }
  }

  save() {
    if (this.mode === 'update') {
      this.updateUser();
    }
  }
  updateUser() {
    const user = this.form.value;
    delete user['imageSrc'];
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.updateUserInformation, user).subscribe(async (result: any) => {
      this.dialogRef.close(result);
      this.blockUI.stop();
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
  get f() {
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
  onCountryChange(event) {
    this.form.controls.countryCode.setValue("+" + event.dialCode);
  }
  telInputObject(obj) {
    if (this.mode === 'update' && !Helper.isBlank(this.defaults.mobileNumber) && !Helper.isBlank(this.defaults.countryCode))
      obj.setNumber(this.defaults.countryCode + this.defaults.mobileNumber);
  }
}