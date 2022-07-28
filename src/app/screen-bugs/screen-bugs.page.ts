import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Incident } from 'src/entities/incident';
import { BugService } from '../services/upload/bug.service';

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

  constructor(private incidentService: BugService, private router: Router, private dataService: DataService) { }

  ionViewDidEnter(){
    this.getBugs();
  }

  async getBugs(){
    this.incidents = await this.incidentService.getAllBugs();
  }

  openIncident(incident: Incident) {
    this.dataService.setData(incident.id, incident);
    this.router.navigateByUrl('/incident/'+incident.id);
  }
}
