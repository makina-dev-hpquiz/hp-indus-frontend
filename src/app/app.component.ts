import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: { title: string; url: string; icon: string; type: string }[];
  constructor() {
    this.sideMenu();
  }

  sideMenu() {
    this.navigate =
    [
        {
        title : 'Home',
        url   : '/home',
        icon  : 'home',
        type  : 'page'
        },
      {
        title : 'Incidents',
        url   : '/incidents',
        icon  : 'bug',
        type  : 'page'
      },
      {
        title : 'Todo',
        url   : 'https://trello.com/b/qn8eTmwn/harry-potter-quiz',
        icon  : 'list',
        type  : 'link'
      },
    ];
  }
}
