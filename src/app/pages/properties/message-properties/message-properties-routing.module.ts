import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagePropertiesComponent } from './message-properties.component';

const routes: Routes = [
  {
    path: '',
    component: MessagePropertiesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagePropertiesRoutingModule { }
