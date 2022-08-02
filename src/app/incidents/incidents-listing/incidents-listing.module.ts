import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenBugsPageRoutingModule } from './incidents-listing-routing.module';

import { IncidentsListingPage } from './incidents-listing.page';
import { HeaderMenuComponent } from '../../header-menu/header-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreenBugsPageRoutingModule
  ],
  declarations: [IncidentsListingPage,
    HeaderMenuComponent]
})
export class ScreenBugsPageModule {}
