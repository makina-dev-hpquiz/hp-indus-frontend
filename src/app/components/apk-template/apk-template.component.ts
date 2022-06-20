import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AndroidPackage } from 'src/entities/androidPackage';
import { ApplicationsNameConst } from 'src/constants/applicationsNameConst';

@Component({
  selector: 'app-apk-template',
  templateUrl: './apk-template.component.html',
  styleUrls: ['./apk-template.component.scss'],
})
export class ApkTemplateComponent implements OnInit, OnChanges {

  @Input() apk: AndroidPackage;
  picture: string;

  constructor() {
  }

  ngOnInit() {
    this.initPicture();
  }

  ngOnChanges(changes: SimpleChanges){
    this.initPicture();
  }

  /**
   * Initialise l'image à afficher en fonction du nom de l'application
   */
  initPicture() {
    console.log(this.apk);
    if (this.apk) {
      if (this.apk.name.includes(ApplicationsNameConst.hpCore)) {
        this.picture = '../../assets/icon/build.svg';
      } else if (this.apk.name.includes(ApplicationsNameConst.hpQuiz)) {
        this.picture = '../../assets/icon/harry_potter_app.png';
      } else {
        this.picture = '../../assets/icon/help-outline.svg';
      }
    }
  }

}
