import { Component, OnInit } from '@angular/core';
import { AndroidPackageService } from 'src/app/services/androidPackage/android-package.service';
import { AndroidPackage } from 'src/entities/androidPackage';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public allHpCoreAPK: AndroidPackage[];
  public allHpQuizAPK: AndroidPackage[] ;

  constructor(private androidPackageService: AndroidPackageService) { }

  async ngOnInit() {
    this.allHpQuizAPK = await this.androidPackageService.getAllHPQuizAPK();
    this.allHpCoreAPK = await this.androidPackageService.getAllHPCoreAPK();
  }

}
