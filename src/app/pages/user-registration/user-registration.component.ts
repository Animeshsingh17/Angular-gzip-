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
import { ExcelService } from 'src/app/core/services/exportToExcelService/excel.service';

@UntilDestroy()
@Component({
  selector: 'theLunchCircle-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
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
export class UserRegistrationComponent
  extends AppComponentBase implements OnInit, AfterViewInit {
  @BlockUI() blockUI: NgBlockUI;
  dataSource: MatTableDataSource<any> | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  tempRegistrationList: any[];
  searchCtrl = new FormControl();
  icSearch = icSearch;
  icAdd = icAdd;
  icMoreVert = icMoreVert;
  icFilterList = icFilterList;
  fileExcel = fileExcel;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  datePicker: any;
  startDate: any;
  endDate: any;
  searchValue: any;
  maxDate=new Date();
  columns: TableColumn<any>[] = [
    { label: 'First Name', property: 'firstName', type: 'text', visible: true },
    { label: 'Last Name', property: 'lastName', type: 'text', visible: true },
    { label: 'Email Address', property: 'email', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Company Name', property: 'companyName', type: 'text', visible: true },
    { label: 'Job Title', property: 'jobTitle', type: 'text', visible: true },

  ];

  constructor(injector: Injector, private datePipe: DatePipe, private excelService: ExcelService) {
    super(injector)
  }

  ngOnInit(): void {
    this.datePicker = new Date();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<any[]>(Boolean)
    ).subscribe(activityList => {
      this.tempRegistrationList = activityList;
      this.dataSource.data = activityList;
    });
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
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
  search() {
    var startDateConverted = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    var endDateConverted = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.datePipe.transform(this.endDate, 'yyyy-MM-dd')
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.fetchTempRegistration, {
      "email": this.searchValue,
      "startDate": startDateConverted,
      "endDate": endDateConverted,
      "isPageable": false,
      "isCompleted": true
    }).subscribe(async (tempRegistrationList: any) => {
      this.blockUI.stop();
      if (tempRegistrationList.success) {
        this.tempRegistrationList = tempRegistrationList.data.response;
        this.subject$.next(this.tempRegistrationList);
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
  exportToExcel() {
    this.excelService.exportAsExcelFile(this.tempRegistrationList, 'tempRegistrationList');
  }
}
