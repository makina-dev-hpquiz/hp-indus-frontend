import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestAPKPage } from './latest-apk.page';

const routes: Routes = [
  {
    path: '',
    component: LatestAPKPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LatestAPKPageRoutingModule {}
