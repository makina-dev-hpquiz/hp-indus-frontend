import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from 'src/entities/incident';
import { IncidentFilter } from 'src/entities/incidentFilter';
import { DataService } from 'src/providers/resolver/data.service';
import { IncidentService } from 'src/providers/services/incident.service';
import { SearchToolbarComponent } from './components/search-toolbar/search-toolbar.component';

@Component({
  selector: 'app-incidents-listing',
  templateUrl: './incidents-listing.page.html',
  styleUrls: ['./incidents-listing.page.scss'],
})
export class IncidentsListingPage{

  @ViewChild(SearchToolbarComponent) searchToolBar: SearchToolbarComponent;

  public incidents: Incident[];

  constructor(private incidentService: IncidentService, private router: Router, private dataService: DataService) {
  }

  /**
   * Appel la searchToolBar pour récuper le filtre à utiliser pour afficher les incidents
   */
  ionViewDidEnter(){
    if(this.searchToolBar) {
      this.searchToolBar.updateSearch();
    }
  }

  /**
   * Permet d'afficher les dates et d'éviter des erreurs d'affichage et consoles
   * @param incident 
   * @returns 
   */
  displayDate(incident: Incident){
    if(incident && incident.date) {
      return incident.date.toLocaleDateString();
    } else {
      return "";
    }
  }

  /**
   * Récupère les incidents en fonction du filtre
   *
   * @param incidentFilter
   */
  async getAllIncidents(incidentFilter: IncidentFilter){
    this.incidents = await this.incidentService.getAll(incidentFilter);
  }

  /**
   * Ouvre la page de mise à jour de l'incident
   *
   * @param incident
   */
  openIncident(incident: Incident) {
    this.dataService.setData(incident.id, incident);
    this.router.navigateByUrl('/incident/'+incident.id);
  }

  /**
   * Indique le nombre d'incidents visible
   *
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
