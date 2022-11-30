import { AfterViewInit, ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { stagger80ms } from '../../../../@vex/animations/stagger.animation';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';
import { User } from './interfaces/user.model'
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icEdit from '@iconify/icons-ic/twotone-edit';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { filter, map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import icDelete from '@iconify/icons-ic/twotone-delete';
import outlineVpnKey from '@iconify/icons-ic/outline-vpn-key';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { Router } from '@angular/router';
import baselinePerson from '@iconify/icons-ic/baseline-person';
import { Helper } from 'src/app/core/helpers/helper';
import { DeleteDialogsComponentComponent } from '../../universal-component/delete-dialogs-component/delete-dialogs-component.component';
import baselineGroupAdd from '@iconify/icons-ic/baseline-group-add';
import baselinePersonAddDisabled from '@iconify/icons-ic/baseline-person-add-disabled';
import sharpPersonAdd from '@iconify/icons-ic/sharp-person-add';
import twotoneLogout from '@iconify/icons-ic/round-log-out';
import baselineDelete from '@iconify/icons-ic/baseline-delete';
import { ExcelService } from 'src/app/core/services/exportToExcelService/excel.service';
import fileExcel from '@iconify/icons-fa-solid/file-excel';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import twotoneNotifications from '@iconify/icons-ic/twotone-notifications';
import { NotificationsComponent } from '../../notifications/admin-notifications/send-notification/notifications.component';
@UntilDestroy()
@Component({
  selector: 'vex-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class UserComponent extends AppComponentBase implements OnInit, AfterViewInit {
  @BlockUI() blockUI: NgBlockUI;
  icSearch = icSearch;
  icAdd = icAdd;
  icFilterList = icFilterList;
  baselineGroupAdd = baselineGroupAdd;
  sharpPersonAdd = sharpPersonAdd;
  twotoneNotifications=twotoneNotifications;
  icMoreVert=icMoreVert;
  baselinePersonAddDisabled = baselinePersonAddDisabled;
  searchCtrl = new FormControl();
  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<User[]> = this.subject$.asObservable();
  users: User[] = [];
  baselineDelete=baselineDelete;
  pageLength: any;
  @Input()
  columns: TableColumn<User>[] = [
    { label: 'Image', property: 'image', type: 'image', visible: true },
    // { label: 'Name', property: 'userName', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'First Name', property: 'firstName', type: 'text', visible: true },
    { label: 'Last Name', property: 'lastName', type: 'text', visible: true },
    { label: 'Email Address', property: 'email', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Phone', property: 'mobileNumber', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    // { label: 'Connections', property: 'connections', type: 'button', visible: true },
    { label: 'Labels', property: 'newUser', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  icMoreHoriz = icMoreHoriz;
  icEdit = icEdit;
  fileExcel = fileExcel;
  icDelete = icDelete;
  icPasswordChange = outlineVpnKey;
  baselinePerson = baselinePerson;
  twotoneLogout = twotoneLogout;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<User> | null;
  selection = new SelectionModel<User>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, injector: Injector, private router: Router, private cd: ChangeDetectorRef,private excelService:ExcelService) {
    super(injector)
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<User[]>(Boolean)
    ).subscribe(user => {
      this.users = user;
      this.dataSource.data = user;
    });
    this.searchUser();
  }
  updateUser(user: User) {
    this.dialog.open(UserCreateUpdateComponent, {
      data: user
    }).afterClosed().subscribe(updatedUser => {
      if (updatedUser?.success) {
        const index = this.users.findIndex((existingUser) => existingUser.userId === updatedUser.data.userId);
        this.users[index] = new User(updatedUser.data);
        this.subject$.next(this.users);
        this.notificationService.open('User is updated successfully', 'success', 1000);
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }
  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }
  showProfile(user) {
    this.router.navigate(['/profile'], { queryParams: { userId: user.userId, email: user.email } });
  }

  searchUser() {
    untilDestroyed(this);
    let value = "";
    if (!Helper.isBlank(this.searchCtrl.value)) {
      value = this.searchCtrl.value;
    }
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.fetchAllUserWithCriteria, { searchValue: value }).subscribe(async (result: any) => {
      this.users = result.data;
      this.subject$.next(this.users);
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      return error;
    });
  }
  blockUser(blockUser: User) {
    var objectData = {};
    objectData['title'] = blockUser.firstName + " " + blockUser.lastName;
    objectData['body'] = "Do you want to block this user?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      disableClose: false,
      width: '400px',
      data: objectData
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {

        this.blockUI.start();
        this.apiService.post(environment.apiUrl + AppConsts.setUserStatus, {
          userId: blockUser.userId,
          status: 'Block'
        }).subscribe(async result => {
          if (result.success) {
            const index = this.users.findIndex((existingUser) => existingUser.userId === blockUser.userId);
            blockUser['userStatus'] = 'Block';

            this.users[index] = new User(blockUser);
            this.subject$.next(this.users);
            this.notificationService.open('User is blocked successfully', 'success', 1000);

          }
          this.blockUI.stop();
        }, error => {
          this.blockUI.stop();
          return error;
        });

      }
    });
  }
  unBlockUser(unblockUser: User) {
    var objectData = {};
    objectData['title'] = unblockUser.firstName + " " + unblockUser.lastName;
    objectData['body'] = "Do you want to unblock this user?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      disableClose: false,
      width: '400px',
      data: objectData
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {

        this.blockUI.start();
        this.apiService.post(environment.apiUrl + AppConsts.setUserStatus, {
          userId: unblockUser.userId,
          status: 'Approved'
        }).subscribe(async result => {
          if (result.success) {
            const index = this.users.findIndex((existingUser) => existingUser.userId === unblockUser.userId);
            unblockUser['userStatus'] = 'Approved';

            this.users[index] = new User(unblockUser);
            this.subject$.next(this.users);
            this.notificationService.open('User is unblocked successfully', 'success', 1000);

          }
          this.blockUI.stop();
        }, error => {
          this.blockUI.stop();
          return error;
        });

      }
    });
  }
  logoutUser(user) {
    var objectData = {};
    objectData['title'] = user.firstName + " " + user.lastName;
    objectData['body'] = "Do you want to logout this user from all devices?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      data: objectData
    }
    ).afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.blockUI.start();
        this.apiService.get(environment.apiUrl + AppConsts.logoutFromDevice + user.userId).subscribe(async (result: any) => {
          if (result?.success) {
            this.notificationService.open('User is logged out from all devices', 'success', 1000)
            this.blockUI.stop();
          }

        }, error => {
          this.blockUI.stop();
          return error;
        });
      }
    })
  }
  deleteUser(user){
    var objectData = {};
    objectData['title'] = user.firstName + " " + user.lastName;
    objectData['body'] = "Do you want to delete this user ?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      data: objectData
    }
    ).afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.blockUI.start();
        this.apiService.delete(environment.apiUrl + AppConsts.deleteUser + user.userId).subscribe(async (result: any) => {
          if (result?.success) {
            this.users.splice(this.users.findIndex((existingUser) => existingUser.userId === user.userId), 1);
            this.subject$.next(this.users);
            this.notificationService.open('User is delete form the application', 'success', 1000)
            this.blockUI.stop();
          }

        }, error => {
          this.blockUI.stop();
          return error;
        });
      }
    })
  }
  exportToExcel(){
    this.excelService.exportAsExcelFile(this.users, 'users');
  }
  sendNotifications(user){
    this.dialog.open(NotificationsComponent, {
      data: {
        messageType: "User",
        userId: user.userId,
        groupId: ""
      }
    })
  }
}
