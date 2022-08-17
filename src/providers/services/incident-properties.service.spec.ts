import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { IncidentPropertiesService } from './incident-properties.service';

describe('IncidentPropertiesService', () => {
  let service: IncidentPropertiesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new IncidentPropertiesService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('TEST IncidentPropertiesService.getTypes', async () => {
    const types = service.getTypes();

  });
  it('TEST IncidentPropertiesService.getPriorities', async () => {
    const priorities = service.getPriorities();
  });
  it('TEST IncidentPropertiesService.getStatus', async () => {
    const status = ['en attente','en cours', 'ok']; //TODO
    const result = service.getStatus();

    expect(result).toEqual(status);
  });
});
