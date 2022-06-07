import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AndroidPackage} from 'src/entities/androidPackage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // 192.168.1.11 192.168.43.20
  private apiUrl = "http://192.168.43.20:8082/apks/";
  public lastAPKPath: string;

  public hpCoreAPK: AndroidPackage;
  public hpQuizAPK: AndroidPackage;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {

    this.getLastHPQuizAPK();
    this.getLastHPCoreApk();
  }

  /**
   * Interroge le serveur pour récupérer l'adresse et des informations sur la dernière APK HP-Quiz
   */
  async getLastHPQuizAPK() {
    let  url = "lastHPQuizAPK";
    this.httpClient.get<any>(this.apiUrl+url).subscribe(data => {
      this.hpQuizAPK = data;
      console.log(this.hpQuizAPK);
    });

    // this.lastAPKPath = "../../assets/apk/app-debug.apk";
  }

  /**
  * Interroge le serveur pour récupérer l'adresse et des informations sur la dernière APK HP-Quiz
  */
  async getLastHPCoreApk() {
    let url = "lastHPCoreAPK";
    this.httpClient.get<any>(this.apiUrl+url).subscribe(data => {
      this.hpCoreAPK = data;
    });
  }


}
