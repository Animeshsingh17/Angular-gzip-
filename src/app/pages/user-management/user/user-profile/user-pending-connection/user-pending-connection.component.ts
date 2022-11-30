import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { filter, finalize } from 'rxjs/operators';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { Helper } from 'src/app/core/helpers/helper';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user.model';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icDelete from '@iconify/icons-ic/twotone-delete';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogsComponentComponent } from 'src/app/pages/universal-component/delete-dialogs-component/delete-dialogs-component.component';

@UntilDestroy()
@Component({
  selector: 'theLunchCircle-user-pending-connection',
  templateUrl: './user-pending-connection.component.html',
  styleUrls: ['./user-pending-connection.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ]
})
export class UserPendingConnectionComponent extends AppComponentBase implements OnInit , AfterViewInit  {

  @BlockUI() blockUI: NgBlockUI;
  friendList=[];
  icSearch = icSearch;
  icAdd = icAdd;
  icDelete = icDelete;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  searchCtrl = new FormControl();
  userId: any;
  @Input()
  columns: TableColumn<User>[] = [
    { label: 'Image', property: 'image', type: 'image', visible: true },
    { label: 'First Name', property: 'firstName', type: 'text', visible: true },
    { label: 'Last Name', property: 'lastName', type: 'text', visible: true },
    { label: 'Email Address', property: 'userEmail', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Phone', property: 'mobileNumber', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }

  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  pageIndex = 0;
  dataSource: MatTableDataSource<User> | null;
  selection = new SelectionModel<User>(true, []);
  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<User[]> = this.subject$.asObservable();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(injector: Injector, private activatedRouter: ActivatedRoute,private dialog: MatDialog) {
    super(injector);
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<User[]>(Boolean)
    ).subscribe(user => {
      this.friendList = user;
      this.dataSource.data = user;
    });
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
    this.activatedRouter.queryParams.subscribe(async params => {
       this.userId = params['userId'];
      if (Helper.isBlank(this.userId)) {
        this.userId = this.authenticationService.currentUserId;
      }
      this.blockUI.start();
      await this.apiService.get(environment.apiUrl + AppConsts.fetchUserConnectionInformation+'?userId=' + this.userId+'&statusType='+ 'Pending')
      .pipe(
        finalize(() => {
          this.blockUI.stop();
        })
      ).subscribe(async result => {
        if (result.success) {
          this.friendList = result.data;
          this.subject$.next(this.friendList);
        }
      }, error => {
        return error;
      });
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }
  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }
  removeConnection(user) {
    var objectData = {};
    objectData['title'] = user.firstName + " " + user.lastName;
    objectData['body'] = "Do you want to delete this connection request?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      disableClose: false,
      data: objectData
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.blockUI.start();
        this.apiService.post(environment.apiUrl + AppConsts.deleteUserConnectionInformation, {
          fromUserId: this.userId,
          toUserId: user.userId
        }).subscribe(async (result: any) => {
          if (result.success) {
            this.friendList.splice(this.friendList.findIndex((existingUser) => existingUser.userId === user.userId), 1);
            this.subject$.next(this.friendList);
            this.notificationService.open('User is deleted successfully', 'success', 1000);
          }
          this.blockUI.stop();
        }, error => {
          this.blockUI.stop();
          return error;
        });
      }
    });
  }
}
