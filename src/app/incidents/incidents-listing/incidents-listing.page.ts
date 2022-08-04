import { Component, ElementRef,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PriorityConst } from 'src/constants/priorityConst';
import { StatusConst } from 'src/constants/statusConst';
import { TypeConst } from 'src/constants/typeConst';
import { Incident } from 'src/entities/incident';
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

  public search: String = "";
  public selectedStatus: Array<String>;

  public logoSortedDate;
  public recentDate = true; 
  public readonly logoRecentDate = "add-outline";
  public readonly logoOldDate = "remove-outline";

  public filter: Array<String>;

  constructor(private incidentService: IncidentService, private router: Router, private dataService: DataService) {
    this.selectedStatus = new Array();
    this.selectedStatus.push(StatusConst.toDo);
    this.selectedStatus.push(StatusConst.doing);

    this.logoSortedDate = this.logoRecentDate;
  }

  sortByDate(){
    if(this.logoSortedDate === this.logoRecentDate) {
      this.logoSortedDate = this.logoOldDate;
    } else {
      this.logoSortedDate = this.logoRecentDate;
    }
    this.recentDate = !this.recentDate;

    // console.log(this.recentDate);
    // console.log(this.logoSortedDate);
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
    // console.log(this.selectedStatus);

    this.updateSearch();
  }

  /**
   * Met à jour la liste des incidents en fonction des différents filtres et tri
   */
  updateSearch(){
    this.filter = new Array();
    this.filter.push(this.search);
    this.filter.push(this.recentDate? "asc": "desc");
    this.filter = this.filter.concat(this.selectedStatus);
    this.filter.push(this.selectedPriority);
    this.filter.push(this.selectedType);

    console.log(this.filter);
  }


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
