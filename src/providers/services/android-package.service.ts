import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AndroidPackage } from 'src/entities/androidPackage';
import { ServerUrlConst } from 'src/constants/serverUrlConst';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class AndroidPackageService extends AbstractService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Interroge le serveur pour récupérer la dernière version de l'APK HP-Quiz
   *
   * @returns Promise<AndroidPackage>
   */
  public getLastHPQuizAPK(): Promise<AndroidPackage> {
    return this.getAPK(ServerUrlConst.urlServer + ServerUrlConst.apkUrl + ServerUrlConst.lastHPQuizAPK);

  }

 /**
  * Interroge le serveur pour récupérer la dernière version de l'APK HP-Core
  *
  * @returns Promise<AndroidPackage>
  */
  public async getLastHPCoreAPK(): Promise<AndroidPackage> {
    return this.getAPK(ServerUrlConst.urlServer + ServerUrlConst.apkUrl + ServerUrlConst.lastHPCoreAPK);
  }

  /**
   * Interroge le serveur pour récupérer une liste d'APK associé à l'application HP-Core
   *
   * @returns Promise<AndroidPackage[]>
   */
  public getAllHPQuizAPK(): Promise<AndroidPackage[]> {
    return this.getAllAPK(ServerUrlConst.urlServer + ServerUrlConst.apkUrl + ServerUrlConst.allHPQuizAPK);
   }

    /**
     * Interroge le serveur pour récupérer une liste d'APK associé à l'application HP-Core
     *
     * @returns Promise<AndroidPackage[]>
     */
  public getAllHPCoreAPK(): Promise<AndroidPackage[]> {
    return this.getAllAPK(ServerUrlConst.urlServer + ServerUrlConst.apkUrl + ServerUrlConst.allHPCoreAPK);
  }

  /**
   * Interroge le serveur pour récupérer une APK
   *
   * @param url
   * @returns Promise<AndroidPackage>
   */
  private async getAPK(url): Promise<AndroidPackage>{

    try {
      console.log('Utilisation de la méthode AndroidPackageService.getAPK : ', url);
      return await this.httpClient.get<AndroidPackage>(url).toPromise();
    } catch(error) {
      console.error('Erreur survenue lors de l\'execution de AndroidPackageService.getAPK() : ', url, error);
      console.error('httpClient est correctement initialisé : ', Boolean(this.httpClient));
    }
  }

   /**
    * Interroge le serveur pour récupérer une liste d'APK
    *
    * @param url
    * @returns Promise<AndroidPackage[]>
    */
  private async getAllAPK(url): Promise<AndroidPackage[]>{
    try {
      console.log('Utilisation de la méthode AndroidPackageService.getAllAPK : ', url);
      return await this.httpClient.get<AndroidPackage[]>(url).toPromise();
    } catch(error) {
      console.error('Erreur survenue lors de l\'execution de AndroidPackageService.getAllAPK() : ', url, error);
      console.error('httpClient est correctement initialisé : ', Boolean(this.httpClient));
    }
  }

}
