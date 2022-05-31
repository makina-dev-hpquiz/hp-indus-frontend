import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenBugsPage } from './screen-bugs.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenBugsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenBugsPageRoutingModule {}
