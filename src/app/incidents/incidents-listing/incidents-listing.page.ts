import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from 'src/entities/incident';
import { IncidentFilter } from 'src/entities/incidentFilter';
import { DataService } from 'src/providers/resolver/data.service';
import { IncidentService } from 'src/providers/services/incident.service';
import { LogService } from 'src/providers/services/log.service';
import { SearchToolbarComponent } from './components/search-toolbar/search-toolbar.component';

@Component({
  selector: 'app-incidents-listing',
  templateUrl: './incidents-listing.page.html',
  styleUrls: ['./incidents-listing.page.scss'],
})
export class IncidentsListingPage {

  @ViewChild(SearchToolbarComponent) searchToolBar: SearchToolbarComponent;

  public incidents: Incident[];
  public imageIsDisplayed: boolean;

  public title = 'Gestion des incidents';

  constructor(private incidentService: IncidentService, private router: Router,
    private dataService: DataService, private logger: LogService) {
      this.imageIsDisplayed = true;
  }

  /**
   * Appel la searchToolBar pour récuper le filtre à utiliser pour afficher les incidents
   */
  async ionViewDidEnter() {
    if (this.searchToolBar) {
      // await this.searchToolBar.init();
      this.searchToolBar.updateSearch();
    }
  }

  /**
   * Permet d'afficher les dates et d'éviter des erreurs d'affichage et consoles
   *
   * @param incident
   * @returns
   */
  public displayDate(incident: Incident) {
    if (incident && incident.updatedAt) {
      return incident.updatedAt.toLocaleDateString();
    } else {
      return '';
    }
  }

  /**
   * Récupère les incidents en fonction du filtre
   *
   * @param incidentFilter
   */
  public async getAllIncidents(incidentFilter: IncidentFilter) {
    this.incidents = await this.incidentService.getAll(incidentFilter);
  }

  /**
   * Ouvre la page de mise à jour de l'incident
   *
   * @param incident
   */
  public async openIncident(incident: Incident) {
    this.logger.log('IncidentsListingPage.openIncident : ', incident.id);
    this.dataService.setData(incident.id, incident);
    await this.router.navigateByUrl('/incident/' + incident.id);
  }

  /**
   * Indique le nombre d'incidents visible
   *
   * @returns number
   */
  public getIncidentNumber(): number {
    if (this.incidents) {
      return this.incidents.length;
    } else {
      return 0;
    }
  }

  public displayImage(isDisplayed:  boolean){
    this.imageIsDisplayed = isDisplayed;
  }

  /**
   * Réinitialise la barre de recherche
   */
  public resetSearchToolbar(){
    console.log('resetSeachToolbar');
    this.searchToolBar.init();
  }
}
