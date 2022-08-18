import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IncidentProperty } from 'src/entities/IncidentProperty';

import { IncidentPropertiesService } from './incident-properties.service';
import { LogService } from './log.service';

describe('IncidentPropertiesService', () => {
  let service: IncidentPropertiesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new IncidentPropertiesService(httpClientSpy, new LogService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('TEST IncidentPropertiesService.getTypes', async () => {
    const expected = new IncidentProperty(
      ['type 1', 'type 2'],
      ['type 1', 'type 2', 'type 3'],
      'type 1'
    );

    httpClientSpy.get.and.returnValue(of(expected));
    const result: IncidentProperty = await service.getTypes();
    expect(result).toEqual(expected);

  });
  it('TEST IncidentPropertiesService.getPriorities', async () => {
    const expected = new IncidentProperty(
      ['priority 1', 'priority 2'],
      ['priority 1', 'priority 2', 'priority 3'],
      ''
    );

    httpClientSpy.get.and.returnValue(of(expected));
    const result = await service.getPriorities();
    expect(result).toEqual(expected);

  });
  it('TEST IncidentPropertiesService.getStatus', async () => {
    const expected = new IncidentProperty(
      ['Status 1', 'Status 2'],
      null,
      ''
    );

    httpClientSpy.get.and.returnValue(of(expected));
    const result = await service.getStatus();
    expect(result).toEqual(expected);
  });
});
