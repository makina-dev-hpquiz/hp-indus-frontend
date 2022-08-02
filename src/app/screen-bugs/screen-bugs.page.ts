import { Component, ElementRef,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from 'src/entities/incident';
import { DataService } from 'src/providers/resolver/data.service';
import { IncidentService } from 'src/providers/services/incident.service';

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
