import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PriorityConst } from 'src/constants/priorityConst';
import { StatusConst } from 'src/constants/statusConst';
import { TypeConst } from 'src/constants/typeConst';
import { IncidentFilter } from 'src/entities/incidentFilter';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss'],
})
export class SearchToolbarComponent implements OnInit {

  @Output() incidentFilterUpdated = new EventEmitter<IncidentFilter>();
  
  //CSS mise à jour
  public readonly outlineButton = "outline";
  public readonly solidButton = "solid";
  public readonly logoRecentDate = "add-outline";
  public readonly logoOldDate = "remove-outline";

  // A Afficher
  public logoSortedDate;
  public readonly toDoMsg = StatusConst.toDo;
  public readonly doingMsg = StatusConst.doing;
  public readonly doneMsg = StatusConst.done;

  public priorities = PriorityConst.getSearchPriority();
  public types = TypeConst.getSearchTypes();

  // Données à traiter
  public filter: IncidentFilter;
  public selectedStatus: Array<string>;
  public recentDate = true;

  constructor() {
    this.selectedStatus = new Array(StatusConst.toDo, StatusConst.doing);
    this.logoSortedDate = this.logoRecentDate;
    this.filter = new IncidentFilter("-date", "", this.selectedStatus, PriorityConst.none, TypeConst.none);   
  }

  ngOnInit() { 
    this.updateSearch();
  }

  /**
   * Construit un item IncidentFilter à partir des infos de la SearchToolbar 
   * et envoi l'évènement avec l'incidentFilter au composant Parent
   */
  updateSearch() {
    this.filter = new IncidentFilter(this.recentDate ? "-date" : "date",
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

  

}
