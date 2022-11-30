import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { SnackBarService } from './core/services/snackBarService/snack-bar.service';
import { ApiService } from './core/services/apiService/apiservice.service';
import { BlockUIModule } from 'ng-block-ui';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ExcelService} from './core/services/exportToExcelService/excel.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
    // Vex
    VexModule,
    CustomLayoutModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  {
    provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
      width: '96%',
      maxWidth: '100vh',
      maxHeight: '100vh',
      hasBackdrop: true,
      disableClose :true
    }
  },
    ApiService, SnackBarService,ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
