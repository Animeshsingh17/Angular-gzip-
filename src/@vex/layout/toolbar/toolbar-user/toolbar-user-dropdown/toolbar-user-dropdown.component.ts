import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';
import { trackById } from '../../../../utils/track-by';
import icPerson from '@iconify/icons-ic/twotone-person';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icAccountCircle from '@iconify/icons-ic/twotone-account-circle';
import icMoveToInbox from '@iconify/icons-ic/twotone-move-to-inbox';
import icListAlt from '@iconify/icons-ic/twotone-list-alt';
import icTableChart from '@iconify/icons-ic/twotone-table-chart';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icDoNotDisturb from '@iconify/icons-ic/twotone-do-not-disturb';
import icOfflineBolt from '@iconify/icons-ic/twotone-offline-bolt';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import icBusiness from '@iconify/icons-ic/twotone-business';
import icVerifiedUser from '@iconify/icons-ic/twotone-verified-user';
import icLock from '@iconify/icons-ic/twotone-lock';
import icNotificationsOff from '@iconify/icons-ic/twotone-notifications-off';
import { Icon } from '@visurel/iconify-angular';
import { PopoverRef } from '../../../../components/popover/popover-ref';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface OnlineStatus {
  id: 'online' | 'away' | 'dnd' | 'offline';
  label: string;
  icon: Icon;
  colorClass: string;
}

@UntilDestroy()
@Component({
  selector: 'vex-toolbar-user-dropdown',
  templateUrl: './toolbar-user-dropdown.component.html',
  styleUrls: ['./toolbar-user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserDropdownComponent implements OnInit, OnDestroy {
  name = "";
  items: MenuItem[] = [
    {
      id: '1',
      icon: icAccountCircle,
      label: 'My Profile',
      description: 'Personal Information',
      colorClass: 'text-teal',
      route: 'profile'
    },
  ];

  statuses: OnlineStatus[] = [
    {
      id: 'online',
      label: 'Online',
      icon: icCheckCircle,
      colorClass: 'text-green'
    },
    {
      id: 'away',
      label: 'Away',
      icon: icAccessTime,
      colorClass: 'text-orange'
    },
    {
      id: 'dnd',
      label: 'Do not disturb',
      icon: icDoNotDisturb,
      colorClass: 'text-red'
    },
    {
      id: 'offline',
      label: 'Offline',
      icon: icOfflineBolt,
      colorClass: 'text-gray'
    }
  ];

  activeStatus: OnlineStatus = this.statuses[0];

  trackById = trackById;
  icPerson = icPerson;
  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icArrowDropDown = icArrowDropDown;
  icBusiness = icBusiness;
  icVerifiedUser = icVerifiedUser;
  icLock = icLock;
  icNotificationsOff = icNotificationsOff;

  constructor(private cd: ChangeDetectorRef, private authenticationService: AuthenticationService,
    private popoverRef: PopoverRef<ToolbarUserDropdownComponent>) {
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(user => {
      var firstName = user.data?.firstName ? user.data?.firstName : "";
      var lastName = user.data?.lastName ? user.data?.lastName : "";
      this.name = firstName + " " + lastName;
      this.cd.markForCheck();
    });
  }

  setStatus(status: OnlineStatus) {
    this.activeStatus = status;
    this.cd.markForCheck();
  }

  close() {
    this.popoverRef.close();
  }
  logout() {
    this.popoverRef.close();
    this.authenticationService.logout();
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    untilDestroyed(this);
  }
}
