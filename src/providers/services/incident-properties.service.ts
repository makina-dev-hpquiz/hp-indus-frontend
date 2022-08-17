import { HttpClient } from '@angular/common/http';
import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { ServerUrlConst } from 'src/constants/serverUrlConst';
import { IncidentProperty } from 'src/entities/IncidentProperty';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentPropertiesService extends AbstractService {

  private incidentType: IncidentProperty;
  private incidentPriority: IncidentProperty;
  private incidentStatus: IncidentProperty;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public async getTypes(): Promise<IncidentProperty> {
    this.incidentType = await this.get(this.incidentType, ServerUrlConst.types);
    return this.incidentType;
  }

  public async getPriorities(): Promise<IncidentProperty> {
    this.incidentPriority = await this.get(this.incidentPriority, ServerUrlConst.priorities);
    return this.incidentPriority;
  }

  public async getStatus(): Promise<IncidentProperty> {
    this.incidentStatus = await this.get(this.incidentStatus, ServerUrlConst.status);
    return this.incidentStatus;
  }

  public async get(property: IncidentProperty, request: string): Promise<IncidentProperty> {
    if (!property) {
      property = await this.httpClient.get<any>(ServerUrlConst.urlServer + ServerUrlConst.incidentUrl + request).toPromise();
    }
    return property;
  }
}
