import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IncidentConst } from 'src/constants/incidentConst';
import { IncidentFilter } from 'src/entities/incidentFilter';
import { IncidentPropertiesService } from 'src/providers/services/incident-properties.service';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss'],
})
export class SearchToolbarComponent {

  @Output() incidentFilterUpdated = new EventEmitter<IncidentFilter>();

  //CSS mise à jour
  public readonly outlineButton = 'outline';
  public readonly solidButton = 'solid';

  public toolbarIsActive: boolean;

  // Variable à afficher
  public logoSortedDate;
  public logoReduceToolbarToDisplay;
  public toDoMsg: string;
  public doingMsg: string;
  public doneMsg: string;

  public priorities: Array<string>;
  public types: Array<string>;

  // Données à traiter
  public filter: IncidentFilter;

  //CSS mise à jour
  private readonly logoRecentDate = 'add-outline';
  private readonly logoOldDate = 'remove-outline';
  private readonly logoReduceToolbar = 'caret-up-outline';
  private readonly logoExpendToolbar = 'caret-down-outline';

  // Données à traiter
  private selectedStatus: Array<string>;
  private recentDate = true;

  constructor(public incidentPropertiesService: IncidentPropertiesService) {
    this.logoSortedDate = this.logoRecentDate;
    this.logoReduceToolbarToDisplay = this.logoReduceToolbar;
    this.toolbarIsActive = true;
    this.filter = new IncidentFilter();
    this.init();
  }

  async init(){
    const incidentType = (await this.incidentPropertiesService.getTypes());
    const incidentPriorities = (await this.incidentPropertiesService.getPriorities());
    const incidentStatus = (await this.incidentPropertiesService.getStatus());

    this.toDoMsg = incidentStatus.properties[0];
    this.doingMsg =incidentStatus.properties[1];
    this.doneMsg = incidentStatus.properties[2];

    this.selectedStatus = new Array(this.toDoMsg,  this.doingMsg);
    this.filter = new IncidentFilter(IncidentConst.sortField, '', this.selectedStatus,
     incidentPriorities.searchProperties[0], incidentType.searchProperties[0]);

    this.priorities = incidentPriorities.searchProperties;
    this.types = incidentType.searchProperties;
  }


  /**
   * Construit un item IncidentFilter à partir des infos de la SearchToolbar
   * et envoi l'évènement avec l'incidentFilter au composant Parent
   */
  public updateSearch() {
    this.filter = new IncidentFilter(this.recentDate ? IncidentConst.sortField : IncidentConst.reverseSortField,
      this.filter.search,
      new Array().concat(this.selectedStatus),
      this.filter.priority,
      this.filter.type
    );

    this.incidentFilterUpdated.emit(this.filter);
  }

  // Change le logo du bouton tri par date
  sortByDate() {
    if (this.logoSortedDate === this.logoRecentDate) {
      this.logoSortedDate = this.logoOldDate;
    } else {
      this.logoSortedDate = this.logoRecentDate;
    }
    this.recentDate = !this.recentDate;
    this.updateSearch();
  }

  /**
   * Change la couleur des boutons status
   *
   * @param button
   * @param status
   */
  changeStatus(button, status) {
    switch (button.fill) {
      case this.solidButton:
        button.fill = this.outlineButton;
        break;
      case this.outlineButton:
        button.fill = this.solidButton;
        break;
    }

    if (this.selectedStatus.includes(status)) {
      this.selectedStatus.splice(this.selectedStatus.indexOf(status), 1);
    } else {
      this.selectedStatus.push(status);
    }

    this.updateSearch();
  }

  /**
   * Réduit ou étend la toolbar de recherche
   */
  reduceOrExpendToolbar() {
    if (this.logoReduceToolbarToDisplay === this.logoReduceToolbar) {
      this.logoReduceToolbarToDisplay = this.logoExpendToolbar;
    } else {
      this.logoReduceToolbarToDisplay = this.logoReduceToolbar;
    }
    this.toolbarIsActive = !this.toolbarIsActive;
  }

  /**
   * Indique si le button ReduceOrExpend de la toolbar doit être affiché ou non,
   * ceci en fonction de la taille de l'écran
   *
   * @returns boolean
   */
  displayReduceOrExpendButton() {
    return (window.screen.width < 920 || window.screen.height < 600);
  }
}
