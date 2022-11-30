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
export interface User {
  name: string;
  userId: string;
  userPhotoCompressUrl: string;
  userPhotoUrl: string;
}
UntilDestroy();
@Component({
  selector: 'theLunchCircle-group-connection',
  templateUrl: './group-connection.component.html',
  styleUrls: ['./group-connection.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ],
})
export class GroupConnectionComponent extends AppComponentBase implements OnInit, AfterViewInit {

  @BlockUI() blockUI: NgBlockUI;
  userList = [];
  icSearch = icSearch;
  icAdd = icAdd;
  icDelete = icDelete;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  searchCtrl = new FormControl();
  @Input()
  columns: TableColumn<User>[] = [
    { label: 'Image', property: 'image', type: 'image', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'USER ID', property: 'userId', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  pageIndex = 0;
  groupId: string;
  groupOwnerId: string;
  dataSource: MatTableDataSource<User> | null;
  selection = new SelectionModel<User>(true, []);
  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<User[]> = this.subject$.asObservable();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private dialog: MatDialog, injector: Injector, private activatedRouter: ActivatedRoute) {
    super(injector);
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<User[]>(Boolean)
    ).subscribe(user => {
      this.userList = user;
      this.dataSource.data = user;
    });
    
    this.activatedRouter.queryParams.subscribe(async params => {
      this.groupId = params['groupId'];
      this.groupOwnerId = params['groupOwnerId'];
      
      this.blockUI.start();
      await this.apiService.get(environment.apiUrl + AppConsts.fetchGroupConnectionlist+'?groupId=' + this.groupId +'&statusType='+ 'Approved')
        .pipe(
          finalize(() => {
            this.blockUI.stop();
          })
        ).subscribe(async result => {
          
          if (result.success) {
            this.userList = result.data;
            this.subject$.next(this.userList);
          }
        }, error => {
          return error;
        });
    });
    this.searchCtrl.valueChanges.pipe(
      // untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
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
    objectData['title'] = user.name;
    objectData['body'] = "Do you want to remove this connection?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      disableClose: false,
      data: objectData
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {
    var list = [];
   
    var object = {};
    object['groupOwnerId'] = this.groupOwnerId;
    object['groupId'] = this.groupId;
    object['userId'] = user.userId;
    object['status'] = 'Cancelled'
    list.push(object);
    
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.updateStatusForGroupConnection, { 'groupConnectionList': list }).subscribe(async (result: any) => {
      if (result?.success) {
        this.userList.splice(this.userList.findIndex((existing) => existing.userId === user.userId), 1);
        this.subject$.next(this.userList);
        this.notificationService.open('Connection is removed successfully', 'success', 1000);
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
