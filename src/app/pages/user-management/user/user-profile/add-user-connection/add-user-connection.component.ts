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
  selector: 'theLunchCircle-add-user-connection',
  templateUrl: './add-user-connection.component.html',
  styleUrls: ['./add-user-connection.component.scss']
})
export class AddUserConnectionComponent extends AppComponentBase implements OnInit {
  form: FormGroup;
  @BlockUI() blockUI: NgBlockUI;
  icClose = icClose;
  icPerson = icPerson;
  userList = [];
  isLoading = false;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddUserConnectionComponent>,
    private fb: FormBuilder, injector: Injector, private cd: ChangeDetectorRef) {
    super(injector)
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      toUser: ['', Validators.required]
    });
    this.form.get('toUser').valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          if(this.form.value.toUser.length>=4){
          this.isLoading = true;
          }
          this.userList = [];
        }),
        switchMap(value => value.length >= 4 ?
          this.apiService.post(environment.apiUrl + AppConsts.fetchAllUserWithCriteria, { searchValue: value })
            .pipe(
              finalize(() => {
                this.isLoading = false;
              }),
            ) : []
        )
      )
      .subscribe(data => {
        if (data.success) {
          this.userList = data.data;
        }
      }
      );
  }

  save() {
    var object={};
    object['fromUserId']=this.defaults;
    object['toUserId']=this.form.value.toUser.userId;
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.addUserConnectionInformation, object).subscribe(async (result: any) => {
      if (result.success) {
        this.dialogRef.close(this.form.value.toUser);
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
  public displayFunction(option): string {
    return option ? option.firstName + " " + option.lastName : option;
  }

}
