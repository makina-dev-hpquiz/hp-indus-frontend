import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerUrlConst } from 'src/constants/serverUrlConst';
import { IncidentProperty } from 'src/entities/IncidentProperty';
import { AbstractService } from './abstract.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentPropertiesService extends AbstractService {

  private incidentType: IncidentProperty;
  private incidentPriority: IncidentProperty;
  private incidentStatus: IncidentProperty;

  constructor(protected httpClient: HttpClient, protected logger: LogService) {
    super(httpClient, logger);
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

  private async get(property: IncidentProperty, request: string): Promise<IncidentProperty> {
    if (!property) {
      const url = ServerUrlConst.urlServer + ServerUrlConst.incidentUrl + request;
      this.logger.log('Utilisation de la méthode IncidentPropertiesService.get :', url);
      property = await this.httpClient.get<any>(url).toPromise();
    }
    return property;
  }
}
