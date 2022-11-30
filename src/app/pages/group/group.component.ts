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
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icEdit from '@iconify/icons-ic/twotone-edit';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateGroupComponent } from "./create-update-group/create-update-group.component";
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import baselinePersonAddAlt1 from '@iconify/icons-ic/baseline-person-add-alt-1';
import { AddConnectionComponent } from './add-connection/add-connection.component';
import { RemoveConnectionComponent } from './remove-connection/remove-connection.component';
import baselinePersonRemove from '@iconify/icons-ic/baseline-person-remove';
import { Router } from '@angular/router';
import twotoneSubtitles from '@iconify/icons-ic/twotone-subtitles';
import baselineImageSearch from '@iconify/icons-ic/baseline-image-search';
import { UploadFileComponent } from "../universal-component/upload-file/upload-file.component";
import icDelete from '@iconify/icons-ic/twotone-delete';
import { DeleteDialogsComponentComponent } from '../universal-component/delete-dialogs-component/delete-dialogs-component.component';
import baselineRefresh from '@iconify/icons-ic/baseline-refresh';
import twotoneNotifications from '@iconify/icons-ic/twotone-notifications';
import { NotificationsComponent } from '../notifications/admin-notifications/send-notification/notifications.component';

@UntilDestroy()
@Component({
  selector: 'theLunchCircle-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ],
})
export class GroupComponent extends AppComponentBase implements OnInit, AfterViewInit {


  @BlockUI() blockUI: NgBlockUI;
  dataSource: MatTableDataSource<any> | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  groupList: any[];
  searchCtrl = new FormControl();
  icSearch = icSearch;
  icAdd = icAdd;
  baselinePersonRemove = baselinePersonRemove;
  icFilterList = icFilterList;
  icMoreVert = icMoreVert;
  twotoneNotifications=twotoneNotifications;
  icEdit = icEdit;
  icMoreHoriz = icMoreHoriz;
  baselinePersonAddAlt1 = baselinePersonAddAlt1;
  twotoneSubtitles = twotoneSubtitles;
  baselineImageSearch = baselineImageSearch;
  icDelete = icDelete;
  baselineRefresh=baselineRefresh;
  selected: any;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  columns: TableColumn<any>[] = [
    { label: 'Image', property: 'image', type: 'image', visible: true },
    { label: 'Circle Name', property: 'name', type: 'text', visible: true },
    { label: 'Circle Type', property: 'memberType', type: 'button', visible: true },
    { label: 'Is Sponsored', property: 'isSponsored', type: 'text', visible: true },
    { label: 'isPrivate', property: 'isPrivate', type: 'text', visible: true },
    { label: 'isVisibleToDCMember', property: 'isVisibleToDCMember', type: 'text', visible: false },
    { label: 'isHidden', property: 'isVisible', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Owner', property: 'creatorName', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Summary', property: 'summary', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Tags', property: 'tags', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  constructor(injector: Injector, private dialog: MatDialog, private router: Router) {
    super(injector)
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<any[]>(Boolean)
    ).subscribe(_groupList => {
      this.groupList = _groupList;
      this.dataSource.data = this.groupList;
    });
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
    this.callback();
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
  openAddGroup() {
    this.dialog.open(
      CreateUpdateGroupComponent, {

    }
    ).afterClosed().subscribe(result => {
      if (result?.success) {
        this.groupList.unshift(result.data);
        this.subject$.next(this.groupList);
        this.notificationService.open('Connection add successfully !!!', 'success', 1000);
      }
    });
  }
  editGroup(group) {
    this.dialog.open(
      CreateUpdateGroupComponent, {
      data: group
    }
    ).afterClosed().subscribe(result => {
      if (result?.success) {
        if (result.type === 'create') {

          this.groupList.unshift(result.data);
          this.subject$.next(this.groupList);
          this.notificationService.open('Group add successfully !!!', 'success', 1000);
        }
        else if (result.type === 'update') {
          const index = this.groupList.findIndex((existing) => existing.groupId === result.data.groupId);
          this.groupList[index] = result.data;
          this.subject$.next(this.groupList);
          this.notificationService.open('Group is updated successfully', 'success', 1000);
        }
      }
    });
  }
  addConnection(group) {
    this.dialog.open(AddConnectionComponent, {
      data: group
    }).afterClosed().subscribe(result => {
      if (result?.success) {
        this.notificationService.open('Connection is added successfully', 'success', 1000);
        this.callback();
      }
    })
  }
  removeConnection(group) {
    this.dialog.open(RemoveConnectionComponent, {
      data: group
    }).afterClosed().subscribe(result => {
      if (result?.success) {
        this.notificationService.open('Connection is remove successfully', 'success', 1000);
        this.callback();
      }
    })
  }

  callback() {
    this.blockUI.start();
    this.apiService.get(environment.apiUrl + AppConsts.fetchGroupList).subscribe(async (result: any) => {
      if (result?.success) {
        this.groupList = result.data;
        this.subject$.next(this.groupList);
      }
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      return error;
    });
  }
  about(group) {
    this.router.navigate(['/circleProfile'], { queryParams: { groupId: group.groupId, groupOwnerId: group.groupOwnerId } })
  }
  uploadGroupImage(group) {
    this.dialog.open(UploadFileComponent,
    ).afterClosed().subscribe(result => {
      if (result.type === 'Yes') {
        let formData = new FormData();
        formData.append('file', result.file, result.file.filename);
        this.blockUI.start();
        this.apiService.post(environment.apiUrl + AppConsts.uploadGroupCoverImage + '?groupId=' + group.groupId, formData).subscribe(async (response: any) => {
          if (response?.success) {
            const index = this.groupList.findIndex((existing) => existing.groupId === group.groupId);
            this.groupList[index]['coverPhotoUrl'] = response.data.coverPhotoUrl;
            this.subject$.next(this.groupList);
            this.notificationService.open('Group photo is uploaded successfully', 'success', 1000);
          }
          this.blockUI.stop();
        }, error => {
          this.blockUI.stop();
          return error;
        }
        )
      }


    });
  }  
  deleteGroup(group) {
    var objectData = {};
    objectData['title'] = 'Delete Circle';
    objectData['body'] = "Do you want to delete this Circle?"
    this.dialog.open(DeleteDialogsComponentComponent, {
      disableClose: false,
      data: objectData
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {

        this.blockUI.start();
        this.apiService.delete(environment.apiUrl + AppConsts.deleteGroup + '?groupId=' + group.groupId + '&groupOwnerId=' + group.groupOwnerId).subscribe(async (result: any) => {
          if (result?.success) {
            this.groupList.splice(this.groupList.findIndex((groupExit) => groupExit.groupId === group.groupId), 1);
            this.subject$.next(this.groupList);
            this.notificationService.open('Group is deleted successfully', 'success', 1000);
          }
          this.blockUI.stop();
        }, error => {
          this.blockUI.stop();
          return error;
        });
      }
    });
  }
  refresh(){
      this.callback();
  }
  sendNotifications(group){
    this.dialog.open(NotificationsComponent, {
      data: {
        messageType: "Circle",
        userId: "",
        groupId: group.groupId
      }
    })
  }
}
