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

  public readonly toDoMsg = StatusConst.toDo;
  public readonly doingMsg = StatusConst.doing;
  public readonly doneMsg = StatusConst.done;

  public readonly outlineButton = "outline";
  public readonly solidButton = "solid";

  public selectedPriority = PriorityConst.none;
  public priorities = PriorityConst.getSearchPriority();

  public selectedType = TypeConst.none;
  public types = TypeConst.getSearchTypes();

  public search: string = "";
  public selectedStatus: Array<string>;

  public logoSortedDate;
  public recentDate = true; 
  public readonly logoRecentDate = "add-outline";
  public readonly logoOldDate = "remove-outline";

  public filter: IncidentFilter;

  constructor(private incidentService: IncidentService, private router: Router, private dataService: DataService) {
    this.selectedStatus = new Array();
    this.selectedStatus.push(StatusConst.toDo);
    this.selectedStatus.push(StatusConst.doing);
    this.filter = new IncidentFilter("-date");

    this.logoSortedDate = this.logoRecentDate;
  }

  sortByDate(){
    if(this.logoSortedDate === this.logoRecentDate) {
      this.logoSortedDate = this.logoOldDate;
    } else {
      this.logoSortedDate = this.logoRecentDate;
    }
    this.recentDate = !this.recentDate;

    this.updateSearch();
  }

  /**
   * Change la couleur des boutons status
   * @param button 
   * @param status 
   */
  changeStatus(button, status){
    switch(button.fill){
      case this.solidButton:
        button.fill = this.outlineButton;
      break;
      case this.outlineButton:
        button.fill = this.solidButton;
      break;
    }

    if(this.selectedStatus.includes(status)) {
      this.selectedStatus.splice(this.selectedStatus.indexOf(status), 1);
    } else {
      this.selectedStatus.push(status);
    }

    this.updateSearch();
  }

  /**
   * Met à jour la liste des incidents en fonction des différents filtres et tri
   */
  updateSearch(){
    this.filter = new IncidentFilter(this.recentDate? "-date": "date",
      this.search,
      new Array().concat(this.selectedStatus),
      this.selectedPriority,
      this.selectedType
    );
      
    this.getAllIncidents();
  }

  ionViewDidEnter(){
    this.getAllIncidents();
  }

  async getAllIncidents(){
    this.incidents = await this.incidentService.getAll(this.filter);
  }

  openIncident(incident: Incident) {
    this.dataService.setData(incident.id, incident);
    this.router.navigateByUrl('/incident/'+incident.id);
  }
}
