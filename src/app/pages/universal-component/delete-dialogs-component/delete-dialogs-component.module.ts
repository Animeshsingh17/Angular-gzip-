import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogsComponentComponent } from './delete-dialogs-component.component'
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [DeleteDialogsComponentComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    IconModule
  ],
  exports: [DeleteDialogsComponentComponent],
  entryComponents: [DeleteDialogsComponentComponent]
})
export class DeleteDialogsComponentModule { }
