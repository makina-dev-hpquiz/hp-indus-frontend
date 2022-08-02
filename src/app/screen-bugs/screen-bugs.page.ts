import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Incident } from 'src/entities/incident';
import { IncidentService } from '../services/upload/incident.service';

import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-screen-bugs',
  templateUrl: './screen-bugs.page.html',
  styleUrls: ['./screen-bugs.page.scss'],
})
export class ScreenBugsPage{

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  public incidents: Incident[];

  constructor(private incidentService: IncidentService, private router: Router, private dataService: DataService) { }

  ionViewDidEnter(){
    this.getAllIncidents();
  }

  async getAllIncidents(){
    this.incidents = await this.incidentService.getAll();
  }

  openIncident(incident: Incident) {
    this.dataService.setData(incident.id, incident);
    this.router.navigateByUrl('/incident/'+incident.id);
  }
}
