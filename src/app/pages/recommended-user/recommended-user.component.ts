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
import baselineBeenhere from '@iconify/icons-ic/baseline-beenhere';



@Component({
  selector: 'theLunchCircle-recommended-user',
  templateUrl: './recommended-user.component.html',
  styleUrls: ['./recommended-user.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ],
})
export class RecommendedUserComponent extends AppComponentBase implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  dataSource: MatTableDataSource<any> | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  recommendeduser: any[];
  searchCtrl = new FormControl();
  icSearch = icSearch;
  icFilterList = icFilterList;
  icMoreVert = icMoreVert;
  icEdit = icEdit;
  icDelete = icDelete;
  baselinePlus = baselinePlus;
  icMoreHoriz = icMoreHoriz;
  baselineBeenhere =baselineBeenhere;
  selected: any;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  datePicker: any;
  startDate: any;
  endDate: any;
  searchValue: any;
  recommdedUser: any;
  columns: TableColumn<any>[] = [
    { label: 'User-Email To', property: 'userEmailTo', type: 'text', visible: true },
    { label: 'To Name', property: 'nameTo', type: 'text', visible: true },
    { label: 'User-Email From', property: 'userEmailFrom', type: 'text', visible: true },
    { label: 'From Name', property: 'nameFrom', type: 'text', visible: true },
    { label: 'Creation Date', property: 'creationDate', type: 'text', visible: false },
    { label: 'Status', property: 'status', type: 'text', visible: true },
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
    ).subscribe(recommendeduser => {
      this.recommendeduser = recommendeduser;
      this.dataSource.data = recommendeduser;
    });
    this.callApi();
  }
  callApi() {
    this.blockUI.start();
    this.apiService.get(environment.apiUrl + AppConsts.getAllUserRecommendList).subscribe(async (recommendeduser: any) => {
      this.blockUI.stop();
      if (recommendeduser.success) {
        this.recommendeduser = recommendeduser.data;
        this.subject$.next(this.recommendeduser);
      }
    }, error => {
      this.blockUI.stop();
      return error;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }
  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }
  // showProfile(user) {
  //   this.router.navigate(['/profile'], { queryParams: { userId: user.userId, email: user.email } });
  // }

  updateCategory(recommdedUser)
  {
    var objectData = {};
    objectData['title'] = recommdedUser.userEmailTo;
    objectData['body'] = "Do you want to approved this request ?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      disableClose: false,
      data: objectData
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.blockUI.start();
        var objectData = {}
        
        objectData['userRecommendId'] = recommdedUser.userRecommendId;
        objectData['status'] = "Approved";
  
    this.apiService.post(environment.apiUrl + AppConsts.updateUserRecommendStatus, objectData).subscribe(async (result: any) => {
      if (result?.success) {
        this.recommendeduser.splice(this.recommendeduser.findIndex((existing) => existing.userId === recommdedUser.userId), 1);
        this.subject$.next(this.recommendeduser);
        this.notificationService.open('Request is approved successfully', 'success', 1000);
      }
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      return error;
    });
      }
    });
  }
  declineUser(recommdedUser) {
    var objectData = {};
    objectData['title'] =recommdedUser.userEmailTo;
    objectData['body'] = "Do you want to Decline this request ?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      disableClose: false,
      data: objectData
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.blockUI.start();
        var objectData = {}
        
        objectData['userRecommendId'] = recommdedUser.userRecommendId;
        objectData['status'] = 'Declined'
       
       this.apiService.post(environment.apiUrl + AppConsts.updateUserRecommendStatus, objectData).subscribe(async (result: any) => {
      if (result?.success) {
        this.recommendeduser.splice(this.recommendeduser.findIndex((existing) => existing.userId === recommdedUser.userId), 1);
        this.subject$.next(this.recommendeduser);
        this.notificationService.open('Request is Decline successfully', 'success', 1000);
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


