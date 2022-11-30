import { Component, Injector, OnInit } from '@angular/core';
import { fadeInUp400ms } from '../../../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../../../@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../../@vex/animations/scale-in.animation';
import { stagger40ms } from '../../../../../../@vex/animations/stagger.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAdd from '@iconify/icons-ic/twotone-add';
import icWhatshot from '@iconify/icons-ic/twotone-whatshot';
import icWork from '@iconify/icons-ic/twotone-work';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icCheck from '@iconify/icons-ic/twotone-check'
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icEdit from '@iconify/icons-ic/twotone-edit';
import outlineVpnKey from '@iconify/icons-ic/outline-vpn-key';
import { User } from '../../interfaces/user.model';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateUpdateComponent } from '../../user-create-update/user-create-update.component';
import { UserPasswordChangeComponent } from '../user-password-change/user-password-change.component';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Helper } from '../../../../../core/helpers/helper';
import twotoneMap from '@iconify/icons-ic/twotone-map';
import baselinePlace from '@iconify/icons-ic/baseline-place';
import baselineEmojiObjects from '@iconify/icons-ic/baseline-emoji-objects';
import { UserPasswordUpdateComponent } from '../../user-password-update/user-password-update.component';
import baselineLock from '@iconify/icons-ic/baseline-lock';
import { UserPermissionComponent } from '../user-permission/user-permission.component';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import baselineSettings from '@iconify/icons-ic/baseline-settings';
import roundDone from '@iconify/icons-ic/round-done';
import baselinePersonAddAlt1 from '@iconify/icons-ic/baseline-person-add-alt-1';
import { UserEmailChangeComponent } from '../user-email-change/user-email-change.component';



@Component({
  selector: 'vex-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class UserAboutComponent extends AppComponentBase implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  user: any = {};
  icWork = icWork;
  icPhone = icPhone;
  icPersonAdd = icPersonAdd;
  icCheck = icCheck;
  icMail = icMail;
  icMoreVert = icMoreVert;
  twotoneMap = twotoneMap;
  icAccessTime = icAccessTime;
  icAdd = icAdd;
  icWhatshot = icWhatshot;
  baselineSettings = baselineSettings;
  icEdit = icEdit;
  icDelete = icDelete;
  icPasswordChange = outlineVpnKey;
  friendList = [];
  baselinePlace = baselinePlace;
  baselineEmojiObjects = baselineEmojiObjects;
  baselineLock = baselineLock;
  userLocation: any = {};
  loadinFriendListFlag = true;
  icMoreHoriz = icMoreHoriz;
  roundDone = roundDone;
  sponsoredCount = 0;
  baselinePersonAddAlt1 = baselinePersonAddAlt1;
  constructor(injector: Injector, private dialog: MatDialog, private activatedRouter: ActivatedRoute) {
    super(injector);
  }

  async ngOnInit() {
    this.activatedRouter.queryParams.subscribe(async params => {
      var userId = params['userId'];
      if (Helper.isBlank(userId)) {
        userId = this.authenticationService.currentUserId;
      }
      this.blockUI.start();

      await this.apiService.get(environment.apiUrl + AppConsts.fetchUserConnectionInformation + '?userId=' + userId + '&statusType=' + 'Approved')
        .pipe(
          finalize(() => {
            this.loadinFriendListFlag = false
          })
        ).subscribe(async result => {
          if (result.success) {
            this.friendList = result.data;
          }
        }, error => {
          return error;
        });
      await this.apiService.get(environment.apiUrl + AppConsts.fetchUserCurrentLocation + userId)
        .pipe(
          finalize(() => {
            //this.blockUI.stop();
          })
        ).subscribe(async result => {
          if (result.success && !Helper.isBlank(result.data)) {
            this.userLocation = result.data;
          }
        }, error => {
          return error;
        });
      await this.apiService.get(environment.apiUrl + AppConsts.fetchSponsoredMemberCount + userId)
        .pipe(
          finalize(() => {
            this.blockUI.stop();
          })
        ).subscribe(async result => {
          if (result?.success) {
            this.sponsoredCount = result.data.count;
          }

        }, error => {
          return error;
        });
      await this.apiService.get(environment.apiUrl + AppConsts.fetchUserInformation + userId)
        .pipe(
          finalize(() => {
            this.blockUI.stop();
          })
        ).subscribe(async result => {
          if (result.success) {
            this.user = result.data;
          }
        }, error => {
          return error;
        });
    });
  }
  changeUserPassword() {
    this.dialog.open(UserPasswordUpdateComponent, {
      data: new User(this.user)
    }).afterClosed().subscribe(updatedUser => {
      if (updatedUser?.success) {
        this.notificationService.open('User password is updated successfully', 'success', 1000);
        // this.authenticationService.logout();
      }
    });

  }
  changeUserEmail() {
    this.dialog.open(UserEmailChangeComponent, {
      data: new User(this.user)
    }).afterClosed().subscribe(updatedUser => {
      if (updatedUser?.success) {
        this.user.email = updatedUser.data.email;
        this.notificationService.open('User email is updated successfully', 'success', 1000);
        // this.authenticationService.logout();
      }
    });
  }
  updateUser() {
    this.dialog.open(UserCreateUpdateComponent, {
      data: new User(this.user)
    }).afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        this.notificationService.open('User is updated successfully', 'success', 1000);
      }
    });
  }

  async permission() {
    this.blockUI.start();
    await this.apiService.get(environment.apiUrl + AppConsts.fetchUserInformation + this.user.userId)
      .pipe(
        finalize(() => {
          this.blockUI.stop();
        })
      ).subscribe(async result => {
        this.dialog.open(UserPermissionComponent, {
          data: result.data
        }).afterClosed().subscribe(result => {
          if (result?.success) {
            this.user['isPromoted'] = result.data.isPromoted;
            this.user['lcflag'] = result.data.isLCFlag;
            if (result.data.permission === 'LC')
              this.user['userPermission'] = 'Lunch Circle';
            else
              this.user['userPermission'] = 'Director Club';
            this.notificationService.open('User membership is update successfully', 'success', 1000);
          }
        })
      }, error => {
        return error;
      });

  }
}
