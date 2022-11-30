import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAdd from '@iconify/icons-ic/twotone-add';
import icWhatshot from '@iconify/icons-ic/twotone-whatshot';
import icWork from '@iconify/icons-ic/twotone-work';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { AppComponentBase } from '../../../../core/shared/AppComponentBase';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { ChangeDetectorRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';
import { Helper } from 'src/app/core/helpers/helper';
export interface Link {
  label: string;
  route: string | string[];
  routerLinkActiveOptions?: { exact: boolean };
  disabled?: boolean;
}
@UntilDestroy()
@Component({
  selector: 'vex-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class UserProfileComponent extends AppComponentBase implements OnInit {

  user: any = {};
  icWork = icWork;
  icPhone = icPhone;
  icPersonAdd = icPersonAdd;
  icCheck = icCheck;
  icMail = icMail;
  icAccessTime = icAccessTime;
  icAdd = icAdd;
  icWhatshot = icWhatshot;
  name="";
  links: Link[] = [
  ];
  constructor(injector: Injector,private activatedRouter: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(async params => {
      var userId = params['userId'];
      if (Helper.isBlank(userId)) {
        userId = this.authenticationService.currentUserId;
      }
    this.apiService.get(environment.apiUrl + AppConsts.fetchUserInformation + userId)
    .subscribe(async result => {
        if (result.success) {
          this.user = result.data;
          this.name=this.user.firstName+" "+this.user.lastName;
        }
      }, error => {
        return error;
      });
    });
   
    this.links=[{
      label: 'ABOUT',
      route: './',
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'CONNECTIONS',
      route: './connection'
    },
    {
      label: 'PENDING CONNECTIONS',
      route: './pendingConnection'
    },
    {
      label: 'USER ACTIVITIES',
      route: './userActivities'
    },
    {
      label: 'USER INTEREST',
      route: './userInternet'
     }
    //,{
    //   label: 'PERMISSIONS',
    //   route: './userPermissions'
    // }
  ]
  }
  
}
