import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PriorityConst } from 'src/constants/priorityConst';
import { StatusConst } from 'src/constants/statusConst';
import { TypeConst } from 'src/constants/typeConst';
import { IncidentFilter } from 'src/entities/incidentFilter';

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
  public readonly toDoMsg = StatusConst.toDo;
  public readonly doingMsg = StatusConst.doing;
  public readonly doneMsg = StatusConst.done;

  public priorities = PriorityConst.getSearchPriority();
  public types = TypeConst.getSearchTypes();

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

  constructor() {
    this.selectedStatus = new Array(StatusConst.toDo, StatusConst.doing);
    this.filter = new IncidentFilter('-date', '', this.selectedStatus, PriorityConst.none, TypeConst.none);

    this.logoSortedDate = this.logoRecentDate;
    this.logoReduceToolbarToDisplay = this.logoReduceToolbar;
    this.toolbarIsActive = true;
  }

  /**
   * Construit un item IncidentFilter à partir des infos de la SearchToolbar
   * et envoi l'évènement avec l'incidentFilter au composant Parent
   */
  public updateSearch() {
    this.filter = new IncidentFilter(this.recentDate ? '-date' : 'date',
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
