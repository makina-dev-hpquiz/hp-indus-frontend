import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AndroidPackage } from 'src/entities/androidPackage';
import { AbstractService } from '../abstractService/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class AndroidPackageService extends AbstractService {

  // URL Principal 
  private readonly APK_URL = "apks/";

  // URL Secondaire
  private readonly LAST_HP_QUIZ_APK = "lastHPQuizAPK";
  private readonly LAST_HP_CORE_APK = "lastHPCoreAPK";

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  /**
  * Interroge le serveur pour récupérer l'APK HP-Quiz
  * @returns Promise<AndroidPackage>
  */
  public getLastHPQuizAPK() {
    return this.getAPK(this.URL_SERVER + this.APK_URL + this.LAST_HP_QUIZ_APK);

  }

 /**
  * Interroge le serveur pour récupérer l'APK HP-Core
  * @returns Promise<AndroidPackage>
  */
  public async getLastHPCoreApk(): Promise<AndroidPackage> {
    return this.getAPK(this.URL_SERVER + this.APK_URL + this.LAST_HP_CORE_APK);
  }

  public getAllHPQuizAPK() { }

  public getAllHPCoreAPK() { }

  /**
   * Interroge le serveur pour récupérer une APK
   * @param url 
   * @returns Promise<AndroidPackage>
   */
  private async getAPK(url): Promise<AndroidPackage> {
    return await this.httpClient.get<AndroidPackage>(url).toPromise();
  }

}
