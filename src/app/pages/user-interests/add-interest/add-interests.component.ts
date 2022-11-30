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
import { MAT_DIALOG_DATA,MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './add-interests.component.html',
  styleUrls: ['./add-interests.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ],
})
export class AddInterestsComponent extends AppComponentBase implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  icGroup = icGroup;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;
  baselinePlus = baselinePlus;
  icClose=icClose;
  form: FormGroup;
  allInterestList: any;
  categoryList: any = [];
  isDisable=false;
  mode: 'create' | 'update' = 'create';
  constructor(private cd: ChangeDetectorRef, injector: Injector,@Inject(MAT_DIALOG_DATA) public defaults: any,
  private dialogRef: MatDialogRef<AddInterestsComponent>,
  private fb: FormBuilder) { 
    super(injector)
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
      this.isDisable=true;
      this.defaults['categoryList']=[{
        interestCategoryId:this.defaults.interestCategoryId,
        interestCategory:this.defaults.interestCategory
      }];
      this.form = this.fb.group({
        categoryList: new FormControl({value:this.defaults.categoryList , disabled: true}, Validators.required),
        interestList: [null, Validators.required],
        prevInterestList: new FormControl({value:this.defaults.listOfInterest , disabled: true}),
      });
    }
    else{
      this.defaults = {}
      this.form = this.fb.group({
        categoryList:[this.defaults.categoryList||null, Validators.required],
        interestList: [this.defaults.listOfInterest || null, Validators.required],
      });
    }
   
    this.apiService.get(environment.apiUrl+AppConsts.fetchAllInterest).subscribe(async (categoryList:any) => {
      this.allInterestList = categoryList.data
      this.categoryList  = this.getUniqueListBy(this.allInterestList,'interestCategory')
      
    });
  }
  getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
  save(){
    
      this.form.value.interestList =  this.form.controls.interestList.value.map(a=>a.interestName);
      this.form.value.categoryList =  this.form.controls.categoryList.value.map(a=>a.interestCategory);
      this.blockUI.start();
      this.apiService.post(environment.apiUrl+AppConsts.saveOrUpdateInterest,this.form.value).subscribe(async (response: any)=>{
        this.blockUI.stop();
        if (response?.success) {
          this.dialogRef.close(this.form.value)
        }
      },
      error=>{
        this.blockUI.stop();
        return error;
      })
  }
}
