import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAllComponent } from './select-all.component';
import { MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [SelectAllComponent],
  imports: [
    MatSelectModule, MatCheckboxModule
  ],
  exports: [
    SelectAllComponent
  ],
})
export class SelectAllModule { }
