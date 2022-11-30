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
import icEdit from '@iconify/icons-ic/twotone-edit';
import { MatDialog } from '@angular/material/dialog';
import { UpdateApplicationPropertiesUpdateComponent } from '../update-application-properties/update-application-properties.component';

UntilDestroy()
@Component({
  selector: 'theLunchCircle-message-properties',
  templateUrl: './message-properties.component.html',
  styleUrls: ['./message-properties.component.scss'],
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
export class MessagePropertiesComponent extends AppComponentBase implements OnInit, AfterViewInit {

  
  @BlockUI() blockUI: NgBlockUI;
  dataSource: MatTableDataSource<any> | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  applicationPropertiesList: any[];
  searchCtrl = new FormControl();
  icSearch = icSearch;
  icAdd = icAdd;
  icFilterList = icFilterList;
  fileExcel = fileExcel;
  icMoreVert = icMoreVert;
  icEdit = icEdit;
  selected: any;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  columns: TableColumn<any>[] = [

    { label: 'Prop Key', property: 'propKey', type: 'text', visible: true },
    { label: 'Prop Value', property: 'propValue', type: 'text', visible: true },
    { label: 'Is Active', property: 'isActive', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'ENV Target', property: 'envTarget', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] }
  ];
  constructor(injector: Injector, private datePipe: DatePipe, private excelService:ExcelService,private dialog: MatDialog,) {
    super(injector)
    
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<any[]>(Boolean)
    ).subscribe(applicationPropertiesList => {
      this.applicationPropertiesList = applicationPropertiesList;
      this.dataSource.data = applicationPropertiesList;
    });
    this.searchCtrl.valueChanges.pipe(
      // untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
    this.blockUI.start();
    this.apiService.get(environment.apiUrl + AppConsts.applicationProperties).subscribe(async (result: any) => {
      this.applicationPropertiesList = result.data;
      this.subject$.next(this.applicationPropertiesList);
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
    this.excelService.exportAsExcelFile(this.applicationPropertiesList, 'applicationPropertiesList');
  }
  updateApplicationProperty(row){
    this.dialog.open(UpdateApplicationPropertiesUpdateComponent, {
      data: row
    }).afterClosed().subscribe(updated => {
      if (updated) {
        const index = this.applicationPropertiesList.findIndex((existing) => existing.propKey === updated.propKey);
        this.applicationPropertiesList[index] = updated;
        this.subject$.next(this.applicationPropertiesList);
        this.notificationService.open('Application property is updated successfully', 'success', 1000);
        
      }
    });
  }
}
