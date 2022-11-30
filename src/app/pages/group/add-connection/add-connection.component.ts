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
import { Observable, of } from 'rxjs';
@Component({
  selector: 'theLunchCircle-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.scss']
})
export class AddConnectionComponent extends AppComponentBase implements OnInit {
  form: FormGroup;
  filteredOptions$: Observable<any>;
  @BlockUI() blockUI: NgBlockUI;
  icClose = icClose;
  icPerson = icPerson;
  userList = [];
  isLoading = false;
  tempMemberList: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddConnectionComponent>,
    private fb: FormBuilder, injector: Injector, private cd: ChangeDetectorRef) {
    super(injector)
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      toUser: [this.defaults.memberList || null, Validators.required]
    });

  }

  save() {
    var userList = this.form.value.toUser;
    var list = [];
    for (let index = 0; index < userList.length; index++) {
      var result = this.defaults.memberList.filter(obj => {
        return obj.userId === userList[index].userId
      })
      if (result.length == 0) {
        var object = {};
        object['groupOwnerId'] = this.defaults.groupOwnerId;
        object['groupId'] = this.defaults.groupId;
        object['userId'] = userList[index].userId;
        list.push(object);
      }
    }
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.createGroupConnection, { 'groupConnectionList': list }).subscribe(async (result: any) => {
      if (result?.success) {
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
  public displayFunction(option): string {
    return option ? option.firstName + " " + option.lastName : option;
  }
  onChangeSearchkey(event) {
    this.filteredOptions$ = of([]);
    if (event.length > 3) {
      this.blockUI.start();
      this.apiService.post(environment.apiUrl + AppConsts.fetchAllUserWithCriteria, { searchValue: event }).subscribe(async result => {
        if (result?.success) {
          this.filteredOptions$ = of(result.data);
        }
        this.blockUI.stop();
      }, error => {
        this.blockUI.stop();
        return error;
      });
    }

  }
}
