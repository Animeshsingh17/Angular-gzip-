import { ChangeDetectorRef, Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs/operators';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { environment } from 'src/environments/environment';
import icPerson from '@iconify/icons-ic/twotone-person';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'theLunchCircle-add-user-interest',
  templateUrl: './add-user-interest.component.html',
  styleUrls: ['./add-user-interest.component.scss']
})
export class AddUserInterestComponent extends AppComponentBase implements OnInit {
  form: FormGroup;
  @BlockUI() blockUI: NgBlockUI;
  icClose = icClose;
  icPerson = icPerson;
  interestList = [];
  isLoading = false;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddUserInterestComponent>,
    private fb: FormBuilder, injector: Injector, private cd: ChangeDetectorRef) {
    super(injector)
  }

  ngOnInit(): void {
    var prevInterestList = this.defaults.interestList.map(a => a.interestId)
    
    
    this.form = this.fb.group({
      interest: [prevInterestList || null, Validators.required]
    });
    this.blockUI.start();
    this.apiService.get(environment.apiUrl + AppConsts.fetchAllInterest).subscribe(async (interestList: any) => {
      this.blockUI.stop();
      if (interestList.success) {
        this.interestList = interestList.data;
      }
    }, error => {
      this.blockUI.stop();
      return error;
    });
  }

  save() {
    var object={};
    object['userId']=this.defaults.userId;
    object['userInterestId']=this.form.value.interest;
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.addUserInterest, object).subscribe(async (result: any) => {
      if (result.success) {
        this.dialogRef.close(result);
      }
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      return error;
    });
  }
  get f() {
    return this.form.controls;
  }

}

