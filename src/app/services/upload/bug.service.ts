import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { Incident } from 'src/entities/incident';
import { AbstractService } from '../abstractService/abstract.service';
import { ServerConst } from 'src/constants/serverConsts';


@Injectable({
  providedIn: 'root'
})
export class BugService extends AbstractService{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Envoie une requête au serveur pour sauvegarder un bug
   *
   * @param formData
   * @returns
   */
  public sendBug(formData) {
    return this.httpClient.post<any>(ServerConst.urlServer+ServerConst.bugUrl+ServerConst.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  /**
   * Envoie une requête au serveur pour récupérer la liste complète des bugs
   *
   * @returns
   */
  public async getAllBugs(): Promise<Incident[]>{
    return await this.httpClient.get<any>(ServerConst.urlServer+ServerConst.bugUrl).toPromise();
  }

  /**
   * Envoie une requête au serveur pour supprimer un bug
   *
   * @param id
   * @returns
   */
  public async deleteBugById(id: string): Promise<Incident[]>{
    return await this.httpClient.delete<any>(ServerConst.urlServer+ServerConst.bugUrl+ServerConst.deleteUrl+id).toPromise();
  }


}



