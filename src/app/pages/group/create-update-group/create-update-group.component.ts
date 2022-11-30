import { ChangeDetectorRef, Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import icClose from '@iconify/icons-ic/twotone-close';
import icPerson from '@iconify/icons-ic/twotone-person';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { Helper } from 'src/app/core/helpers/helper';

@Component({
  selector: 'theLunchCircle-create-update-group',
  templateUrl: './create-update-group.component.html',
  styleUrls: ['./create-update-group.component.scss']
})
export class CreateUpdateGroupComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  @BlockUI() blockUI: NgBlockUI;
  icClose = icClose;
  icPerson = icPerson;
  userList = [];
  isLoading = false;
  mode: 'create' | 'update' = 'create';
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CreateUpdateGroupComponent>,
    private fb: FormBuilder, injector: Injector, private cd: ChangeDetectorRef) {
    super(injector)
  }

  ngOnInit(): void {
    
    if (this.defaults) {
      this.mode = 'update';
      var tags = this.defaults.tags;
      if (!Helper.isBlank(tags)) {
        var tagList = [];
        if (tags.includes(',')) {
          var tagSplit = tags.split(',');

          for (let index = 0; index < tagSplit.length; index++) {
            var tagObj = {};
            tagObj['_key'] = tagSplit[index];
            tagObj['name'] = tagSplit[index];
            tagList.push(tagObj);

          }

        }
        else {
          var tagObj = {};
          tagObj['_key'] = tags;
          tagObj['name'] = tags;
          tagList.push(tagObj);
        }
        this.defaults.tags = tagList;
      }
    }
    else {
      this.defaults = {}
    }
    this.form = this.fb.group({
      coverPhotoUrl: [this.defaults.coverPhotoUrl || null],
      groupOwnerId: [this.defaults.groupOwnerId || null],
      isPrivate: [this.defaults.userisPrivateId || true],
      isVisible: [this.defaults.isVisible || false],
      name: [this.defaults.name || null, [Validators.required]],
      summary: [this.defaults.summary || null],
      tags: [this.defaults.tags || null],
      groupId: [this.defaults.groupId || null],
      isSponsored: [this.defaults.isSponsored || false],
      isVisibleToDCMember: [this.defaults.isVisibleToDCMember || false],
      memberType: [this.defaults.memberType || null]

    });

    this.form.get('groupOwnerId').valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          if (this.form.value.groupOwnerId.length >= 4) {
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
    if (!Helper.isBlank(this.form.value.tags)) {
      let tagsArr = this.form.value.tags.map(a => a.name)
      this.form.value.tags = tagsArr.toString();
    }
    if(this.form.value.isSponsored){
      this.form.value.isPrivate = false;
    }
    if(!this.form.value.isPrivate){
      this.form.value.isVisible=false;
    }
   
    this.blockUI.start();
    if (this.mode === 'create') {
      if(Helper.isBlank(this.form.value.groupOwnerId.userId)){
        this.form.value.groupOwnerId = this.form.value.groupOwnerId;
      }
      else{
        this.form.value.groupOwnerId = this.form.value.groupOwnerId.userId;
      }
      this.apiService.post(environment.apiUrl + AppConsts.createGroup, this.form.value).subscribe(async (result: any) => {

        if (result?.success) {
          result['type'] = 'create';
          this.dialogRef.close(result);
        }
        this.blockUI.stop();
      }, error => {
        this.blockUI.stop();
        return error;
      });
    }
    else if (this.mode === 'update') {
      this.apiService.patch(environment.apiUrl + AppConsts.updateGroup + '?groupId=' + this.form.value.groupId, this.form.value).subscribe(async (result: any) => {
        if (result?.success) {
          result['type'] = 'update';
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
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
