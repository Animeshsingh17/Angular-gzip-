import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { environment } from 'src/environments/environment';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';
import fileExcel from '@iconify/icons-fa-solid/file-excel';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { ExcelService } from 'src/app/core/services/exportToExcelService/excel.service';
import baselineRefresh from '@iconify/icons-ic/baseline-refresh';
import { DeleteDialogsComponentComponent } from '../../universal-component/delete-dialogs-component/delete-dialogs-component.component';
import { MatDialog } from '@angular/material/dialog';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';


@UntilDestroy()
@Component({
  selector: 'theLunchCircle-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss'],
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
export class PendingListComponent extends AppComponentBase implements OnInit, AfterViewInit {

  
  @BlockUI() blockUI: NgBlockUI;
  friendList=[];
  dataSource: MatTableDataSource<any> | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  pendingList: any[];
  searchCtrl = new FormControl();
  icSearch = icSearch;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icDelete = icDelete;
  icMoreHoriz = icMoreHoriz;
  fileExcel = fileExcel;
  icMoreVert = icMoreVert;
  baselineRefresh=baselineRefresh;
  selected: any;
  pageSize = 10;
  userId: any;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  columns: TableColumn<any>[] = [
    { label: 'From Email Address', property: 'fromUserEmail', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'To User Email', property: 'toUserEmail', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Connection Status', property: 'connectionStatus', type: 'text', visible: true },
    // { label: 'Is requested', property: 'isRequested', type: 'text', visible: true },
    { label: 'Sent Date', property: 'sentDate', type: 'text', visible: true },
    { label: 'Message', property: 'message', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }

  ];
  constructor(injector: Injector, private datePipe: DatePipe, private excelService:ExcelService,private dialog: MatDialog) {
    super(injector)
    
  }


  ngOnInit(): void {  
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<any[]>(Boolean)
    ).subscribe(pendingList => {
      this.pendingList = pendingList;
      this.dataSource.data = pendingList;
    });
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
   
  this.callDataFetchApi();
     
  }
  callDataFetchApi(){
    this.blockUI.start();
    this.apiService.get(environment.apiUrl + AppConsts.fetchAllUserConnectionPendingList).subscribe(async (result: any) => {
      this.subject$.next(result.data);
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      return error;
    });
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
 
  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }
  exportToExcel(){
    this.excelService.exportAsExcelFile(this.pendingList, 'pendingList');
  }
  refresh(){
  this.callDataFetchApi();
  }

  // Remove Connection
  removeConnection(user) {
    var objectData = {};
    objectData['title'] = user.toUserEmail
    objectData['body'] = "Do you want to delete this connection request?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      disableClose: false,
      data: objectData
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.blockUI.start();
        var objectData = {}
        
        objectData['fromUserId'] = user.fromUserId;
        objectData['toUserId'] = user.toUserId;
        this.apiService.post(environment.apiUrl + AppConsts.deleteUserConnectionInformation, objectData).subscribe(async (result: any) => {
          if (result.success) {
            this.friendList.splice(this.friendList.findIndex((existingUser) => existingUser.toUserId === user.toUserId), 1);
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
