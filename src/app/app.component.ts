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
          title: 'Navigation',
          url: '/navigation',
          icon: 'list',
          type: 'page'
        },
        {
          title: 'APK',
          url: '/apk',
          icon: 'logo-android',
          type: 'page'
        },
        {
          title: 'Incidents',
          url: '/incidents',
          icon: 'bug',
          type: 'page'
        },
       
      ];
  }
}
