import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenBugsPageRoutingModule } from './incidents-listing-routing.module';

import { IncidentsListingPage } from './incidents-listing.page';
import { SearchToolbarComponent } from './components/search-toolbar/search-toolbar.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreenBugsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [IncidentsListingPage, SearchToolbarComponent]
})
export class ScreenBugsPageModule {}
