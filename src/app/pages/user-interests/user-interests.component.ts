import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { TableColumn } from '../../../../src/@vex/interfaces/table-column.interface';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { environment } from 'src/environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import baselinePlus from '@iconify/icons-ic/baseline-plus';
import { MatDialog } from '@angular/material/dialog';
import { AddInterestsComponent } from "./add-interest/add-interests.component";
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, ReplaySubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icSearch from '@iconify/icons-ic/twotone-search';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import { Helper } from 'src/app/core/helpers/helper';
import icEdit from '@iconify/icons-ic/twotone-edit';
import { DeleteDialogsComponentComponent } from '../universal-component/delete-dialogs-component/delete-dialogs-component.component';
import icDelete from '@iconify/icons-ic/twotone-delete';
import { DeleteInterestComponent } from './delete-interest/delete-interest.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './user-interests.component.html',
  styleUrls: ['./user-interests.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ],
})

@UntilDestroy()
export class UserInterestsComponent extends AppComponentBase implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  dataSource: MatTableDataSource<any> | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  interestList: any[];
  searchCtrl = new FormControl();
  icSearch = icSearch;
  icFilterList = icFilterList;
  icMoreVert = icMoreVert;
  icEdit = icEdit;
  icDelete = icDelete;
  baselinePlus = baselinePlus;
  icMoreHoriz = icMoreHoriz;
  selected: any;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  datePicker: any;
  startDate: any;
  endDate: any;
  searchValue: any;
  interest: any;
  columns: TableColumn<any>[] = [
    { label: 'Interest Category', property: 'interestCategory', type: 'text', visible: true },
    { label: 'Interest Item', property: 'listOfInterest', type: 'button', visible: false },
    { label: 'IS Active', property: 'isActive', type: 'text', visible: false },
    { label: 'Creation Date', property: 'creationDate', type: 'text', visible: true },
    { label: 'Modified Date', property: 'modifiedDate', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  constructor(injector: Injector, private dialog: MatDialog) {
    super(injector)
  }

  ngOnInit(): void {
    this.datePicker = new Date();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<any[]>(Boolean)
    ).subscribe(interestList => {
      this.interestList = interestList;
      this.dataSource.data = interestList;
    });
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
    this.callApi();
  }
  callApi() {
    this.blockUI.start();
    this.apiService.get(environment.apiUrl + AppConsts.fetchAllInterest).subscribe(async (interestList: any) => {
      this.blockUI.stop();
      if (interestList.success) {
        this.interestList = interestList.data;
        this.subject$.next(this.interestList);
      }
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
  addInterest() {
    this.dialog.open(AddInterestsComponent, {

    }).afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.open('Interest is added successfully', 'success', 1000);
        this.callApi();
      }
    });
  }

  editInterest(interest) {
    this.dialog.open(AddInterestsComponent, {
      data: interest
    }).afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.open('Interest is added successfully', 'success', 1000);
        this.callApi();
      }
    });
  }

  deleteCategory(interest) {
    var objectData = {};
    objectData['title'] = interest.interestCategory;
    objectData['body'] = "Do you want to delete this category?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      disableClose: false,
      width: '400px',
      data: objectData
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.blockUI.start();
        this.apiService.get(environment.apiUrl + AppConsts.deleteCategory + "?categoryId=" + interest.interestCategoryId).subscribe(async result => {
          if (result.success) {
            this.interestList.splice(this.interestList.findIndex((existing) => existing.interestCategoryId === interest.interestCategoryId), 1);
            this.subject$.next(this.interestList);
            this.notificationService.open('Category is deleted successfully', 'success', 1000);

          }
          this.blockUI.stop();
        }, error => {
          this.blockUI.stop();
          return error;
        });

      }
    });
  }
  deleteInterest(interest){
    this.dialog.open(DeleteInterestComponent, {
      data: interest
    }).afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.open('Interest is delete successfully', 'success', 1000);
        this.callApi();
      }
    });
  }

  updateCategory(interest){
    this.dialog.open( UpdateCategoryComponent, {
      data: interest
    }).afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.open('Interest is delete successfully', 'success', 1000);
        this.callApi();
      }
    });
  }
  searchInterest() {
    untilDestroyed(this);
    if (!Helper.isBlank(this.searchCtrl.value)) {
      this.blockUI.start();
      this.apiService.post(environment.apiUrl + AppConsts.fetchAllUserWithCriteria, { searchValue: this.searchCtrl.value }).subscribe(async (result: any) => {
        this.interest = result.data;
        this.subject$.next(this.interest);
        this.blockUI.stop();
      }, error => {
        this.blockUI.stop();
        return error;
      });
    }
  }
}
