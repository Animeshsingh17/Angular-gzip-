import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateApplicationPropertiesUpdateComponent } from './update-application-properties.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [UpdateApplicationPropertiesUpdateComponent],
  entryComponents: [UpdateApplicationPropertiesUpdateComponent],
  exports: [UpdateApplicationPropertiesUpdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatNativeDateModule,
    Ng2TelInputModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule
  ],
  providers: [  
    
  ]
})
export class UpdateApplicationPropertiesUpdateModule { }
