import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConst } from 'src/constants/serverConst';
import { IncidentProperty } from 'src/entities/IncidentProperty';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentPropertiesService extends AbstractService{

  private incidentType: IncidentProperty;
  private incidentPriority: IncidentProperty;
  private incidentStatus: IncidentProperty;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public async getTypes(): Promise<IncidentProperty>{
    this.incidentType =  await this.get(this.incidentType, ServerConst.types);
    return this.incidentType;
  }

  public async getPriorities(): Promise<IncidentProperty>{
    this.incidentPriority = await this.get(this.incidentPriority, ServerConst.priorities);
    return this.incidentPriority;
  }

  public async getStatus(): Promise<IncidentProperty>{
    this.incidentStatus = await this.get(this.incidentStatus, ServerConst.status);
    return this.incidentStatus;
  }

  private async get(property: IncidentProperty , request: string): Promise<IncidentProperty>{
    if(!property){
      property = await this.httpClient.get<any>(ServerConst.urlServer + ServerConst.incidentUrl + request).toPromise();
    }
    return property;
  }
}
