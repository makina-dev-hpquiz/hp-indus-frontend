import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LatestAPKPage } from './latest-apk.page';

import { LatestAPKPageRoutingModule } from './latest-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { APKComponentsModule } from '../components/apk-components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LatestAPKPageRoutingModule,
    ComponentsModule,
    APKComponentsModule
  ],
  declarations: [LatestAPKPage]
})
export class LatestAPKPageModule {}
