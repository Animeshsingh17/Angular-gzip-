import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { PopoverService } from '../../../components/popover/popover.service';
import { ToolbarUserDropdownComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';
import icPerson from '@iconify/icons-ic/twotone-person';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'vex-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserComponent extends AppComponentBase  implements OnInit, OnDestroy{

  name="";
  dropdownOpen: boolean;
  icPerson = icPerson;
  constructor(private popover: PopoverService,
              private cd: ChangeDetectorRef, injector: Injector) {
                super(injector)
              }
  ngOnInit() {
    this.authenticationService.user.subscribe(user => {
      var firstName = user.data?.firstName ? user.data?.firstName : "";
      var lastName = user.data?.lastName ? user.data?.lastName : "";
      this.name = firstName + " " + lastName;
      this.cd.markForCheck();
    });
  }

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
  ngOnDestroy(): void {
    untilDestroyed(this);
  }
}
