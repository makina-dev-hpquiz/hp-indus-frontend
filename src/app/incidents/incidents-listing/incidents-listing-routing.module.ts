import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentsListingPage } from './incidents-listing.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentsListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenBugsPageRoutingModule {}
