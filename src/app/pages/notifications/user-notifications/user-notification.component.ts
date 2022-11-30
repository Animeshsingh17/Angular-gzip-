import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { environment } from 'src/environments/environment';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import fileExcel from '@iconify/icons-fa-solid/file-excel';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import outlineVpnKey from '@iconify/icons-ic/outline-vpn-key';
import icDelete from '@iconify/icons-ic/twotone-delete';
import baselinePerson from '@iconify/icons-ic/baseline-person';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icEdit from '@iconify/icons-ic/twotone-edit';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsComponent } from './send-notification/notifications.component';
import { ExcelService } from 'src/app/core/services/exportToExcelService/excel.service';
import twotoneNotifications from '@iconify/icons-ic/twotone-notifications';
import baselineRefresh from '@iconify/icons-ic/baseline-refresh';


@UntilDestroy()
@Component({
  selector: 'theLunchCircle-admin-notifications',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ],
  providers: [
    DatePipe
  ]
})
export class UserNotificationComponent extends AppComponentBase implements OnInit, AfterViewInit {
  @BlockUI() blockUI: NgBlockUI;
  dataSource: MatTableDataSource<any> | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  userNotificationList: any[];
  searchCtrl = new FormControl();
  icSearch = icSearch;
  icAdd = icAdd;
  icFilterList = icFilterList;
  fileExcel = fileExcel;
  icMoreVert = icMoreVert;
  icMoreHoriz = icMoreHoriz;
  icEdit = icEdit;
  icDelete = icDelete;
  icPasswordChange = outlineVpnKey;
  baselinePerson = baselinePerson;
  twotoneNotifications=twotoneNotifications;
  baselineRefresh=baselineRefresh;
  selected: any;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  datePicker: any;
  startDate: any;
  endDate: any;
  searchValue: any;
  maxDate=new Date();
  columns: TableColumn<any>[] = [

    { label: 'Message Type', property: 'messageType', type: 'text', visible: true },
    { label: 'Title', property: 'title', type: 'text', visible: true },
    { label: 'body', property:'body', type:'text', visible: true},
    { label: 'message', property: 'message', type: 'text', visible: true },
    { label: 'Status Type', property: 'statusType', type: 'text', visible: true },
    { label: 'email', property: 'email', type: 'text', visible: true },
    { label: 'Creation Date', property: 'creationDate', type: 'text', visible: true}
  ];
  startDateConverted: string;
  endDateConverted: string;
  initialStartDate: Date;

  constructor(injector: Injector, private datePipe: DatePipe,private dialog: MatDialog,private excelService:ExcelService) {
    super(injector)
  }

  ngOnInit(): void {
    this.datePicker=new Date();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<any[]>(Boolean)
    ).subscribe(userNotificationList => {
      this.userNotificationList = userNotificationList;
      this.dataSource.data = userNotificationList;
    });
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
    this.endDate=this.maxDate;
    this.initialStartDate = new Date();
    this.initialStartDate.setDate(this.initialStartDate.getDate() - 1);
    this.startDate = this.initialStartDate;
    this.downloadAllUserNotification();
  }
  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
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
  downloadAllUserNotification() {
    this.startDateConverted = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDateConverted = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.datePipe.transform(this.endDate, 'yyyy-MM-dd')
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.fetchAllNotificationAfterParticularDate, {
      "email": this.searchValue|| '',
      "startDate": this.startDateConverted,
      "endDate": this.endDateConverted,
      "isPageable": false,
      "notificationType": 'Mobile-App'
    }).subscribe(async (userNotificationList: any) => {
      this.blockUI.stop();
      if (userNotificationList.success) {
        this.userNotificationList=userNotificationList.data.response;
        this.subject$.next(this.userNotificationList);
      }
    }, error => {
      this.blockUI.stop();
      return error;
    });
  }
  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }
  openDialogBox(user){
    this.dialog.open(NotificationsComponent, {
      data: user
    })
  }
  exportToExcel(){
    this.excelService.exportAsExcelFile(this.userNotificationList, 'userNotificationList');
  }
  sendNotifications(){
    this.dialog.open(NotificationsComponent, {
    })
  }
  refresh(){
    this.downloadAllUserNotification();
  }
}
