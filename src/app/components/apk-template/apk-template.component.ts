import { Component, Input, OnInit } from '@angular/core';
import { AndroidPackage } from 'src/entities/androidPackage';

@Component({
  selector: 'apk-template',
  templateUrl: './apk-template.component.html',
  styleUrls: ['./apk-template.component.scss'],
})
export class ApkTemplateComponent implements OnInit {

  @Input() apk: AndroidPackage;

  constructor() { }

  ngOnInit() {}

}
