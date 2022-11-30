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
import { Helper } from 'src/app/core/helpers/helper';
@Component({
  selector: 'theLunchCircle-add-connection',
  templateUrl: './remove-connection.component.html',
  styleUrls: ['./remove-connection.component.scss']
})
export class RemoveConnectionComponent extends AppComponentBase implements OnInit {
  form: FormGroup;
  filteredOptions$: Observable<any>;
  @BlockUI() blockUI: NgBlockUI;
  icClose = icClose;
  icPerson = icPerson;
  userList = [];
  isLoading = false;
  tempMemberList: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<RemoveConnectionComponent>,
    private fb: FormBuilder, injector: Injector, private cd: ChangeDetectorRef) {
    super(injector)
  }

  ngOnInit(): void {
    this.tempMemberList = [...this.defaults.memberList]
    this.form = this.fb.group({
      toUser: [this.defaults.memberList || null]
    });

  }

  save() {
    var userList = this.form.value.toUser;
    var list = [];
    for (let index = 0; index < this.tempMemberList.length; index++) {
      if (!Helper.isBlank(userList) && userList.length > 0) {
        var result = userList.filter(obj => {
          return obj.userId === this.tempMemberList[index].userId
        });
        if (result.length == 0) {
          var object = {};
          object['groupOwnerId'] = this.defaults.groupOwnerId;
          object['groupId'] = this.defaults.groupId;
          object['userId'] = this.tempMemberList[index].userId;
          object['status']= "Cancelled",
          list.push(object);
        }
      }
      else {
        var object = {};
        object['groupOwnerId'] = this.defaults.groupOwnerId;
        object['groupId'] = this.defaults.groupId;
        object['userId'] = this.tempMemberList[index].userId;
        object['status']= "Cancelled",
        list.push(object);
      }
    }
    if (list.length > 0) {
      this.blockUI.start();
      this.apiService.post(environment.apiUrl + AppConsts.updateStatusForGroupConnection, { 'groupConnectionList': list }).subscribe(async (result: any) => {
        if (result?.success) {
          this.dialogRef.close(result);
        }
        this.blockUI.stop();
      }, error => {
        this.blockUI.stop();
        return error;
      });
    }

  }
  get f() {
    return this.form.controls;
  }
  public displayFunction(option): string {
    return option ? option.firstName + " " + option.lastName : option;
  }
}
