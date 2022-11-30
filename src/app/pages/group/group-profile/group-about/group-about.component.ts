import { Component, Injector, OnInit } from '@angular/core';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import baselinePlace from '@iconify/icons-ic/baseline-place';
import baselineEmojiObjects from '@iconify/icons-ic/baseline-emoji-objects';
import baselineLock from '@iconify/icons-ic/baseline-lock';
import twotoneGroups from '@iconify/icons-ic/twotone-groups';
import baselinePerson from '@iconify/icons-ic/baseline-person';
import outlineDoubleArrow from '@iconify/icons-ic/outline-double-arrow';
import { UntilDestroy } from '@ngneat/until-destroy';
import twotoneReceipt from '@iconify/icons-ic/twotone-receipt';

UntilDestroy();

@Component({
  selector: 'theLunchCircle-group-about',
  templateUrl: './group-about.component.html',
  styleUrls: ['./group-about.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class GroupAboutComponent extends AppComponentBase implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  group: any = {};
  icMoreVert = icMoreVert;
  twotoneGroups =twotoneGroups;
  baselinePerson = baselinePerson;
  outlineDoubleArrow=outlineDoubleArrow;
  friendList=[];
  baselinePlace=baselinePlace;
  baselineEmojiObjects= baselineEmojiObjects;
  baselineLock=baselineLock;
  twotoneReceipt=twotoneReceipt;
  loadinFriendListFlag=true;
  constructor(injector: Injector, private activatedRouter: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(async (params:any) => {
      var groupId = params['groupId'];

      this.blockUI.start();
      this.apiService.get(environment.apiUrl+ AppConsts.fetchGroupInformation+'?groupId='+groupId).pipe(
        finalize(()=>{

        })
      ).subscribe(async (result:any) => {
        this.blockUI.stop();
        if(result?.success)
        {
          this.group = result.data;
        }
      },error=>{
        this.blockUI.stop();
        return error;
      })
    })
  }

}
