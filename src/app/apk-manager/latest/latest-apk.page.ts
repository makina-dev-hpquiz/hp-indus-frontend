import { Component, OnInit } from '@angular/core';
import { AndroidPackage } from 'src/entities/androidPackage';
import { AndroidPackageService } from 'src/providers/services/android-package.service';

@Component({
  selector: 'app-latest-apk',
  templateUrl: 'latest-apk.page.html',
  styleUrls: ['latest-apk.page.scss'],
})
export class LatestAPKPage implements OnInit {

  public title = 'Gestion des APKs';
  public hpCoreAPK: AndroidPackage;
  public hpQuizAPK: AndroidPackage;

  constructor(private androidPackageService: AndroidPackageService) {
  }

  async ngOnInit() {
    this.hpQuizAPK = await this.androidPackageService.getLastHPQuizAPK();
    this.hpCoreAPK = await this.androidPackageService.getLastHPCoreAPK();
  }

}
