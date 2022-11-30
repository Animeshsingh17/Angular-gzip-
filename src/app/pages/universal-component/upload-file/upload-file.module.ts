import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    IconModule
  ],
  exports: [UploadFileComponent],
  entryComponents: [UploadFileComponent]
})
export class UploadFileModule { }
