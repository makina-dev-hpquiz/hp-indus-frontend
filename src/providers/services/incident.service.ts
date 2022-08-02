import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { Incident } from 'src/entities/incident';
import { ServerConst } from 'src/constants/serverConsts';
import { AbstractService } from './abstract.service';


@Injectable({
  providedIn: 'root'
})
export class IncidentService extends AbstractService{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Envoie une requête au serveur pour sauvegarder un bug
   *
   * @param incidentFormData
   * @returns
   */
  public async save(incidentFormData): Promise<Incident> {
    return await this.httpClient.post<any>(ServerConst.urlServer+ServerConst.incidentUrl, incidentFormData).toPromise();
  }

  /**
   * Envoie une requête au serveur pour mettre à jour un incident
   *
   * @param incidentFormData
   * @returns
   */
  public async update(incidentFormData): Promise<Incident>  {
    return await this.httpClient.put<any>(ServerConst.urlServer+ServerConst.incidentUrl, incidentFormData).toPromise();
  }

  /**
   * Envoie une requête au serveur pour récupérer la liste complète des bugs
   *
   * @returns
   */
  public async getAll(): Promise<Incident[]>{
    return await this.httpClient.get<any>(ServerConst.urlServer+ServerConst.incidentUrl).toPromise();
  }

  /**
   * Envoie une requête au serveur pour supprimer un bug
   *
   * @param id
   * @returns
   */
  public async deleteById(id: string){
    return await this.httpClient.delete<any>(ServerConst.urlServer+ServerConst.incidentUrl+id).toPromise();
  }


}



