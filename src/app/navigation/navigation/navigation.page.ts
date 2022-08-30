import { Component, OnInit } from '@angular/core';
import { NavigationConst } from 'src/constants/navigationConst';
import { LinksGroup } from 'src/entities/linksGroup';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {

  public linkHeadings: LinksGroup[];

  constructor() { }

  ngOnInit() {
    this.linkHeadings = NavigationConst.getNavigationConsts();
  }

}
