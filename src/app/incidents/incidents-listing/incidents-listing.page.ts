import { Component, ElementRef,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PriorityConst } from 'src/constants/priorityConst';
import { StatusConst } from 'src/constants/statusConst';
import { TypeConst } from 'src/constants/typeConst';
import { Incident } from 'src/entities/incident';
import { IncidentFilter } from 'src/entities/incidentFilter';
import { DataService } from 'src/providers/resolver/data.service';
import { IncidentService } from 'src/providers/services/incident.service';

@Component({
  selector: 'app-incidents-listing',
  templateUrl: './incidents-listing.page.html',
  styleUrls: ['./incidents-listing.page.scss'],
})
export class IncidentsListingPage{

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  public incidents: Incident[];

  constructor(private incidentService: IncidentService, private router: Router, private dataService: DataService) {
  }

  async getAllIncidents(incidentFilter: IncidentFilter){
    this.incidents = await this.incidentService.getAll(incidentFilter);
  }

  openIncident(incident: Incident) {
    this.dataService.setData(incident.id, incident);
    this.router.navigateByUrl('/incident/'+incident.id);
  }

  /**
   * Indique le nombre d'incidents visible
   * @returns number
   */
  public getIncidentNumber(): number{
    if(this.incidents){
      return this.incidents.length;
    } else {
      return 0;
    }
  }
}
