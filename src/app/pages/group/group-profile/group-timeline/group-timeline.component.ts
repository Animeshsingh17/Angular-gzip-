import { Component, Injector, OnInit } from '@angular/core';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import icKeyboardArrowRight from '@iconify/icons-ic/twotone-keyboard-arrow-right';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { environment } from 'src/environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'theLunchCircle-group-timeline',
  templateUrl: './group-timeline.component.html',
  styleUrls: ['./group-timeline.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class GroupTimelineComponent extends AppComponentBase implements OnInit {
  icKeyboardArrowRight=icKeyboardArrowRight;
  groupPostList: any;
  @BlockUI() blockUI: NgBlockUI;
  constructor(injector: Injector, private activatedRouter: ActivatedRoute) { 
    super(injector)
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
          this.groupPostList = result.data.groupPostList;
        }

      },error=>{
        this.blockUI.stop();
        return error;
      })
    })
  }

}
