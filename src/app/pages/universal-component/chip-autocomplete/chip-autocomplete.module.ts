import { NgModule } from '@angular/core';
import { ChipAutocompleteComponent } from './chip-autocomplete.component';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectAllModule } from '../select-all/select-all.module';
import { IconModule } from '@visurel/iconify-angular';
@NgModule({
  declarations: [ChipAutocompleteComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    SelectAllModule,
    IconModule
  ],
  exports: [ChipAutocompleteComponent]
})
export class ChipAutocompleteModule { }
