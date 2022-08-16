import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Incident } from 'src/entities/incident';
import { ServerConst } from 'src/constants/serverConst';
import { AbstractService } from './abstract.service';
import { IncidentFilter } from 'src/entities/incidentFilter';
import { DateUtil } from 'src/utils/dateUtil';


@Injectable({
  providedIn: 'root'
})
export class IncidentService extends AbstractService {

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
    return await this.httpClient.post<any>(ServerConst.urlServer + ServerConst.incidentUrl, incidentFormData).toPromise();
  }

  /**
   * Envoie une requête au serveur pour mettre à jour un incident
   *
   * @param incidentFormData
   * @returns
   */
  public async update(incidentFormData): Promise<Incident> {
    return await this.httpClient.put<any>(ServerConst.urlServer + ServerConst.incidentUrl, incidentFormData).toPromise();
  }

  /**
   * Envoie une requête au serveur pour récupérer la liste complète des bugs
   *
   * @returns
   */
  public async getAll(filter: IncidentFilter): Promise<Incident[]> {
    let paramsUrl = '?sort=' + filter.sort;
    if (filter.search) {
      paramsUrl += '&q=' + filter.search;
    }
    if (filter.status.length > 0) {
      paramsUrl += '&status=' + filter.status.join(',');
    }
    if (filter.priority) {
      paramsUrl += '&priority=' + filter.priority;
    }
    if (filter.type) {
      paramsUrl += '&type=' + filter.type;
    }
    let incidents: Incident[] = await this.httpClient.get<any>(ServerConst.urlServer + ServerConst.incidentUrl + paramsUrl).toPromise().then(incidents => {
      incidents.forEach(incident => {
        incident.date = DateUtil.convertStringDateToDate(incident.date);
      });
      return incidents;
    });
    
    return incidents;
  }

  /**
   * Envoie une requête au serveur pour récupérer l'incident dont l'id est fourni en paramètre
   *
   * @returns
   */
  public async get(id): Promise<Incident> {
    return await this.httpClient.get<any>(ServerConst.urlServer + ServerConst.incidentUrl + '/' + id).toPromise().then(incident => {
      incident.date = DateUtil.convertStringDateToDate(incident.date);
      return incident;
    });


    // return incident;
  }

  /**
   * Envoie une requête au serveur pour supprimer un bug
   *
   * @param id
   * @returns
   */
  public async deleteById(id: string) {
    return await this.httpClient.delete<any>(ServerConst.urlServer + ServerConst.incidentUrl + id).toPromise();
  }
}



