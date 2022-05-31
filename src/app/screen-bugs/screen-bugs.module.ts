import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenBugsPageRoutingModule } from './screen-bugs-routing.module';

import { ScreenBugsPage } from './screen-bugs.page';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreenBugsPageRoutingModule
  ],
  declarations: [ScreenBugsPage, 
    HeaderMenuComponent]
})
export class ScreenBugsPageModule {}
