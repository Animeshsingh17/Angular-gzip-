import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationPropertiesComponent } from './application-properties.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationPropertiesComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationPropertiesRoutingModule { }
