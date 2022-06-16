import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
import { ApkTemplateComponent } from '../components/apk-template/apk-template.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,
    HeaderMenuComponent, ApkTemplateComponent]
})
export class HomePageModule {}
