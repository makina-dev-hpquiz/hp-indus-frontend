import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddIncidentPageRoutingModule } from './add-incident-routing.module';

import { AddIncidentPage } from './add-incident.page';
import { ImageInputComponent } from './components/image-input/image-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddIncidentPageRoutingModule
  ],
  declarations: [AddIncidentPage, ImageInputComponent]
})
export class AddIncidentPageModule {}
