import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingListComponent } from './pending-list.component';

const routes: Routes = [
  {
    path: '',
    component: PendingListComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingListRoutingModule {
  
  
 }