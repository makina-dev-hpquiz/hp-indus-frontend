import { Component, OnInit } from '@angular/core';
import { AndroidPackage } from 'src/entities/androidPackage';
import { AndroidPackageService } from 'src/providers/services/android-package.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public hpCoreAPK: AndroidPackage;
  public hpQuizAPK: AndroidPackage;

  constructor(private androidPackageService: AndroidPackageService) {
  }

  async ngOnInit() {
    this.hpQuizAPK = await this.androidPackageService.getLastHPQuizAPK();
    this.hpCoreAPK = await this.androidPackageService.getLastHPCoreAPK();
  }

}
