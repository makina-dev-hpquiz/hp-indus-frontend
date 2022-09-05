import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LatestAPKPage } from './latest-apk.page';

import { LatestAPKPageRoutingModule } from './latest-routing.module';
import { ApkTemplateComponent } from '../components/apk-template/apk-template.component';
import { HeaderMenuComponent } from 'src/app/components/header-menu/header-menu.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LatestAPKPageRoutingModule
  ],
  declarations: [LatestAPKPage,
    HeaderMenuComponent, ApkTemplateComponent]
})
export class LatestAPKPageModule {}
