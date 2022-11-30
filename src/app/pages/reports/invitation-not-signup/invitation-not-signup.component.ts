import { AfterViewInit, ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import icGroup from '@iconify/icons-ic/twotone-group';
import icPageView from '@iconify/icons-ic/twotone-pageview';
import icCloudOff from '@iconify/icons-ic/twotone-cloud-off';
import icTimer from '@iconify/icons-ic/twotone-timer';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, ReplaySubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import fileExcel from '@iconify/icons-fa-solid/file-excel';
import { ExcelService } from 'src/app/core/services/exportToExcelService/excel.service';
import baselineRefresh from '@iconify/icons-ic/baseline-refresh';

@UntilDestroy()
@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './invitation-not-signup.component.html',
  styleUrls: ['./invitation-not-signup.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ],
})
export class InvitationNotSignupComponent extends AppComponentBase implements OnInit, AfterViewInit{
  @BlockUI() blockUI: NgBlockUI;
  dataSource: MatTableDataSource<any> | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  icGroup = icGroup;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;
  icSearch = icSearch;
  icAdd = icAdd;
  icFilterList = icFilterList;
  fileExcel=fileExcel;
  baselineRefresh=baselineRefresh;
  notSignupList: any[];
  searchCtrl = new FormControl();
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  columns: TableColumn<any>[] = [
    { label: 'Invitee Email Address', property: 'inviteeEmail', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Invited Email Address', property: 'invitedEmail', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Invitatoin Date', property: 'invitedDate', type: 'text', visible: true }
  ];
  constructor(injector: Injector,private excelService:ExcelService){
    super(injector);
    
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<any[]>(Boolean)
    ).subscribe(notSignupList => {
      this.notSignupList = notSignupList;
      this.dataSource.data = notSignupList;
    });
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
    
    this.fetchDataApi();
  }
  fetchDataApi(){
    this.blockUI.start();
    this.apiService.post(environment.apiUrl+AppConsts.fetchAllInvitationNotSignup,{}).subscribe(async (result:any) => {
      this.subject$.next(result.data);
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      return error;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
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
    this.excelService.exportAsExcelFile(this.notSignupList, 'notSignupList');
  }
  refresh(){
  this.fetchDataApi();
  }
}
