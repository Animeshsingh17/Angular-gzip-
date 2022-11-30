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
import { AddUserInterestComponent } from '../add-user-interest/add-user-interest.component';

@UntilDestroy()
@Component({
  selector: 'theLunchCircle-user-interest',
  templateUrl: './user-interest.component.html',
  styleUrls: ['./user-interest.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ]
})
export class UserInterestComponent extends AppComponentBase implements OnInit, AfterViewInit {

  @BlockUI() blockUI: NgBlockUI;
  interestList = [];
  icSearch = icSearch;
  icAdd = icAdd;
  icDelete = icDelete;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  searchCtrl = new FormControl();
  @Input()
  columns: TableColumn<User>[] = [
    { label: 'Category Name', property: 'categoryName', type: 'text', visible: false },
    { label: 'Interest Name', property: 'interestName', type: 'text', visible: true },
    { label: 'Creation Date', property: 'creationDate', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Modified Date', property: 'modifiedDate', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'isActive', property: 'isActive', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  pageIndex = 0;
  userId;
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
      this.interestList = user;
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
      this.callBackApi(this.userId);
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

  remove(interest) {
    var objectData = {};
    objectData['title'] = interest.interestName;
    objectData['body'] = "Do you want to delete this interest?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      disableClose: false,
      data: objectData
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {
        var obj={};
        obj['userId']=this.userId;
        obj['userInterestId']=[interest.userInterestId];
        this.blockUI.start();
        this.apiService.post(environment.apiUrl + AppConsts.deleteUserInterest,obj).subscribe(async (result: any) => {
          if (result?.success) {
            this.interestList.splice(this.interestList.findIndex((existing) => existing.userInterestId === interest.userInterestId), 1);
            this.subject$.next(this.interestList);
            this.notificationService.open('Interest is deleted successfully', 'success', 1000);
          }
          this.blockUI.stop();
        }, error => {
          this.blockUI.stop();
          return error;
        });
      }
    });
  }
  add() {
    var object = {}
    object['userId'] = this.userId;
    object['interestList'] = this.interestList;
    this.dialog.open(AddUserInterestComponent, {
      data: object
    }).afterClosed().subscribe(newInterest => {
      if(newInterest){
      this.callBackApi(this.userId);
      this.notificationService.open('Connection add successfully !!!', 'success', 1000);
      }
    });
  }

  async callBackApi(userId){
    this.blockUI.start();
    await this.apiService.get(environment.apiUrl + AppConsts.fetchUserInterset+'?userId=' + userId +'&statusType='+ 'Approved')
      .pipe(
        finalize(() => {
          this.blockUI.stop();
        })
      ).subscribe(async result => {
        if (result.success) {
          this.interestList = result.data;
          this.subject$.next(this.interestList);
        }
      }, error => {
        return error;
      });
  }
}
