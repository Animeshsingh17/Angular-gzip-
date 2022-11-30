import { AfterViewInit, Component, Directive, Inject, Injectable, Injector, Input, OnInit, ViewChild } from '@angular/core';
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
import fileExcel from '@iconify/icons-fa-solid/file-excel';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import outlineVpnKey from '@iconify/icons-ic/outline-vpn-key';
import icDelete from '@iconify/icons-ic/twotone-delete';
import baselinePerson from '@iconify/icons-ic/baseline-person';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icEdit from '@iconify/icons-ic/twotone-edit';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ExcelService } from 'src/app/core/services/exportToExcelService/excel.service';
import { ActivityResponseBodyComponent } from 'src/app/pages/reports/activity/activity-response-body/activity-response-body.component';
import { DateAdapter } from "@angular/material/core";
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY
} from "@angular/material/datepicker";


@Injectable()
export class MaxRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D> {
  start: any;
  public delta: number;
  constructor(private _dateAdapter: DateAdapter<D>) { }

  selectionFinished(date: D, currentRange: DateRange<D>) {
    let { start, end } = currentRange;
    if (start == null || (start && end)) {
      start = date;
      end = null;
    } else if (end == null) {
      const maxDate = this._dateAdapter.addCalendarDays(start, this.delta);
      end = date ? (date > maxDate ? maxDate : date) : null;
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
  selector: 'theLunchCircle-user-pending-connection',
  templateUrl: './user-activities.component.html',
  styleUrls: ['./user-activities.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ]
})
export class UserActivitiesComponent extends AppComponentBase implements OnInit, AfterViewInit {

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
  selected: any;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  datePicker: any;
  startDate: any;
  endDate: any;
  maxDate= new Date();
  @Input()
  columns: TableColumn<any>[] = [
    { label: 'User Email Address', property: 'userEmail', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Creation Date', property: 'creationDate', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    // { label: 'IP Address', property: 'ipAddress', type: 'text', visible: true },
    { label: 'Action', property: 'action', type: 'text', visible: true },
    { label: 'Status', property: 'status', type: 'text', visible: true },
    { label: 'Execution Time', property: 'executionTime', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  friendList: User[];
  userId: string;
  email: string;
  initialStartDate: Date;
  
  constructor(injector: Injector, private datePipe: DatePipe, private dialog: MatDialog, private excelService: ExcelService, private activatedRouter: ActivatedRoute) {
    super(injector)
  }
  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(async params => {
      this.userId = params['userId'];
      this.email = params['email'];
      if (Helper.isBlank(this.userId)) {
        this.userId = this.authenticationService.currentUserId;
      }

    });
    this.datePicker = new Date();
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
    var startDateConverted = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    var endDateConverted = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.datePipe.transform(this.endDate, 'yyyy-MM-dd')
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.fetchAllActivityAfterParticularDate, {
      "email": this.email,
      "startDate": startDateConverted,
      "endDate": endDateConverted
    }).subscribe(async (activityList: any) => {
      this.blockUI.stop();
      if (activityList.success) {
        this.activityList = activityList.data;
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
  openDialogBox(user) {
    this.dialog.open(ActivityResponseBodyComponent, {
      data: user
    })
  }
  exportToExcel() {
    this.excelService.exportAsExcelFile(this.activityList, 'activityList');
  }
}
