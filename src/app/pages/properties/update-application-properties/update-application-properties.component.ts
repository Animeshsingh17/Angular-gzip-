import { ChangeDetectorRef, Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiService } from 'src/app/core/services/apiService/apiservice.service';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { validateBasis } from '@angular/flex-layout';

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
  templateUrl: './update-application-properties.component.html',
  styleUrls: ['./update-application-properties.component.scss']
})
export class UpdateApplicationPropertiesUpdateComponent extends AppComponentBase implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,injector: Injector,
    private dialogRef: MatDialogRef<UpdateApplicationPropertiesUpdateComponent>,
    private fb: FormBuilder, private cd: ChangeDetectorRef) { 
      super(injector)
    }

  ngOnInit(): void {
      this.form = this.fb.group({
        propKey: [this.defaults.propKey],
        isActive: [this.defaults.isActive, Validators.required] ,
        propValue: [this.defaults.propValue, Validators.required],
        envTarget: [this.defaults.envTarget]
      });
  }

  save(){
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.updateApplicationProperties, this.form.value).subscribe(async (result: any) => {
      if(result?.success){
      this.dialogRef.close(this.form.value);
      }
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      return error;
    });
  }
  
}