import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Directive, Inject, Injectable, Injector, Input, OnInit, ViewChild } from '@angular/core';
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
import { ActivityResponseBodyComponent } from '../activity/activity-response-body/activity-response-body.component';
import { ExcelService } from 'src/app/core/services/exportToExcelService/excel.service';
import baselineRefresh from '@iconify/icons-ic/baseline-refresh';
import { DateRange, MatDateRangeSelectionStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { SnackBarService } from 'src/app/core/services/snackBarService/snack-bar.service';

@Injectable()
export class MaxRangeSelectionStrategy<D> 
  implements MatDateRangeSelectionStrategy<D> {
  start: any;
  public delta: number;
  
  constructor(private _dateAdapter: DateAdapter<D>,private notificationService:SnackBarService) {

   }

  selectionFinished(date: D, currentRange: DateRange<D>) {
    let { start, end } = currentRange;
    if (start == null || (start && end)) {
      start = date;
      end = null;

    } else if (end == null) {
      const maxDate = this._dateAdapter.addCalendarDays(start, this.delta);
      end = date ? (date > maxDate ? maxDate : date) : null;
      
      if(maxDate === end){
        this.notificationService.open("You have selected date maximum date range of 7 days.","warning",2000);
      }
    }
    return new DateRange<D>(start, end);
  }
  createPreview(
    activeDate: D | null,
    currentRange: DateRange<D>
  ): DateRange<D> {
    if (currentRange.start && !currentRange.end) {
      const maxDate = this._dateAdapter.addCalendarDays(
        currentRange.start,
        this.delta
      );
      const rangeEnd = activeDate
        ? activeDate > maxDate
          ? maxDate
          : activeDate
        : null;

      return new DateRange(currentRange.start, rangeEnd);
    }

    return new DateRange<D>(null, null);
  }
}

@Directive({
  selector: "[maxRange]",
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: MaxRangeSelectionStrategy
    }
  ]
})
export class MaxRangeDirective {
  constructor(
    @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY)
    private maxRangeStrategy: MaxRangeSelectionStrategy<any>
  ) { }
  @Input() set maxRange(value: number) {
    this.maxRangeStrategy.delta = +value || 7;
  }
}


@UntilDestroy()
@Component({
  selector: 'theLunchCircle-activity',
  templateUrl: './last-activity.component.html',
  styleUrls: ['./last-activity.component.scss'],
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
export class LastActivityComponent extends AppComponentBase implements OnInit, AfterViewInit {
  @BlockUI() blockUI: NgBlockUI;
  dataSource: MatTableDataSource<any> | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  activityList: any[];
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
  baselineRefresh= baselineRefresh;
  selected: any;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  datePicker: any;
  startDate: any;
  endDate: any;
  searchValue: any;
  maxDate=new Date();
  initialStartDate : Date;
  columns: TableColumn<any>[] = [
    { label: 'User Email Address', property: 'userEmail', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Creation Date', property: 'creationDate', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    // { label: 'IP Address', property: 'ipAddress', type: 'text', visible: true },
    { label: 'End Point', property: 'action', type: 'text', visible: true },
    { label: 'Status', property: 'status', type: 'text', visible: true },
    { label: 'Execution Time', property: 'executionTime', type: 'text', visible: true },
    { label: 'Interaction Count', property: 'userInteractionWithServer', type: 'text', visible: true},
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  startDateConverted: string;
  endDateConverted: string;

  constructor(injector: Injector, private datePipe: DatePipe,private dialog: MatDialog,private excelService:ExcelService) {
    super(injector)
  }

  ngOnInit(): void {
    this.datePicker=new Date();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<any[]>(Boolean)
    ).subscribe(activityList => {
      this.activityList = activityList;
      this.dataSource.data = activityList;
    });
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));

    this.endDate=this.maxDate;
    this.initialStartDate = new Date();
    this.initialStartDate.setDate(this.initialStartDate.getDate() - 1);
    this.startDate = this.initialStartDate;
    this.downloadAllActivity();
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
  downloadAllActivity() {
    this.startDateConverted = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDateConverted = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.datePipe.transform(this.endDate, 'yyyy-MM-dd')
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.fetchUserActivityUniqueAfterParticularDate, {
      "email": this.searchValue,
      "startDate": this.startDateConverted,
      "endDate": this.endDateConverted
    }).subscribe(async (activityList: any) => {
      this.blockUI.stop();
      if (activityList.success) {
        this.activityList=activityList.data;
        this.subject$.next(this.activityList);
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
  openDialogBox(user,requestType){
    user['requestType'] = requestType;
    this.dialog.open(ActivityResponseBodyComponent, {
      data: user
    })
  }
  exportToExcel(){
    this.excelService.exportAsExcelFile(this.activityList, 'activityList');
  }
  refresh(){
    this.downloadAllActivity();
  }
}
