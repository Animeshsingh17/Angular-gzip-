import { ChangeDetectorRef, Component, Inject, Injector, OnInit } from '@angular/core';
import icGroup from '@iconify/icons-ic/twotone-group';
import icPageView from '@iconify/icons-ic/twotone-pageview';
import icCloudOff from '@iconify/icons-ic/twotone-cloud-off';
import icTimer from '@iconify/icons-ic/twotone-timer';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { environment } from 'src/environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import baselinePlus from '@iconify/icons-ic/baseline-plus';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import icClose from '@iconify/icons-ic/twotone-close';
import { Helper } from 'src/app/core/helpers/helper';

@Component({
  selector: 'theLunchCircle-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ]
})
export class UpdateCategoryComponent extends AppComponentBase implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  icGroup = icGroup;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;
  baselinePlus = baselinePlus;
  icClose = icClose;
  form: FormGroup;
  allInterestList: any;
  categoryList: any = [];
  tempListOfInterest: any = [];
  mode: 'create' | 'update' = 'create';
  constructor(private cd: ChangeDetectorRef, injector: Injector, @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<UpdateCategoryComponent>,
    private fb: FormBuilder) {
    super(injector)
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    }
    else {
      this.defaults = {}
    }
    this.form = this.fb.group({
      categoryId: [this.defaults.interestCategoryId || null],
      categoryName: [this.defaults.interestCategory || null, Validators.required],
    });
  }
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
  save() {
    this.blockUI.stop();
    this.apiService.post(environment.apiUrl + AppConsts.modifyCategory, this.form.value).subscribe(async (response: any) => {
      this.blockUI.stop();
      if (response?.success) {
        this.dialogRef.close(response)
      }
    },
      error => {
        this.blockUI.stop();
        return error;
      })
  }
}

