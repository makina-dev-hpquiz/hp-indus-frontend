import { HttpClient } from '@angular/common/http';
import { Incident } from 'src/entities/incident';
import { of } from 'rxjs';
import { IncidentService } from './incident.service';
import { IncidentFilter } from 'src/entities/incidentFilter';
import { LogService } from './log.service';

describe('IncidentService', () => {
  let service: IncidentService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new IncidentService(httpClientSpy, new LogService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('TEST IncidentService.save', async () => {
    const expected = new Incident('f0de50b4-a33a-4cde-8587-876a9e8851ab',
      'Test 1',
      'Description du test 1',
      '',
      '',
      'normal',
      new Date('2022-06-07T16:00:00.135Z'),
      new Date('2022-06-07T16:00:00.135Z'),
      'interface'
    );
    httpClientSpy.post.and.returnValue(of(expected));
    const result: Incident = await service.save(expected);
    expect(result).toEqual(expected);
  });

  it('TEST IncidentService.update', async () => {
    const expected = new Incident('f0de50b4-a33a-4cde-8587-876a9e8851ab',
      'Test 1',
      'Description du test 1',
      '',
      '',
      'normal',
      new Date('2022-06-07T16:00:00.135Z'),
      new Date('2022-06-07T16:00:00.135Z'),
      'interface'
    );
    httpClientSpy.put.and.returnValue(of(expected));
    const result: Incident = await service.update(expected);
    expect(result).toEqual(expected);
  });

  it('TEST IncidentService.getAll', async () => {
    const expected = [
      new Incident('f0de50b4-a33a-4cde-8587-876a9e8851ab',
        'Test 1',
        'Description du test 1',
        '',
        '',
        'normal',
        new Date('2022-06-07T16:00:00.135Z'),
        new Date('2022-06-07T16:00:00.135Z'),
        'interface'
      ),
      new Incident('k0de50b4-a33a-4cde-8587-876a9e8851ac',
        'Test 2',
        'Description du test 2',
        '',
        '',
        'normal',
        new Date('2022-06-07T16:00:00.135Z'),
        new Date('2022-06-07T16:00:00.135Z'),
        'interface'
      )
    ];
    httpClientSpy.get.and.returnValue(of(expected));
    const incidentFilter = new IncidentFilter();
    const result: Incident[] = await service.getAll(incidentFilter);
    expect(result).toEqual(expected);
  });

  it('TEST IncidentService.deleteById', async () => {
    const expected = new Incident('f0de50b4-a33a-4cde-8587-876a9e8851ab',
      'Test 1',
      'Description du test 1',
      '',
      '',
      'normal',
      new Date('2022-06-07T16:00:00.135Z'),
      new Date('2022-06-07T16:00:00.135Z'),
      'interface'
    );
    httpClientSpy.delete.and.returnValue(of('202'));
    const result = await service.deleteById(expected.id);
    expect(result).toEqual('202');
  });
  it('TEST IncidentService.get', async () => {
    const expected = new Incident('f0de50b4-a33a-4cde-8587-876a9e8851ab',
      'Test 1',
      'Description du test 1',
      '',
      '',
      'normal',
      new Date('2022-06-07T16:00:00.135Z'),
      new Date('2022-06-07T16:00:00.135Z'),
      'interface'
    );
    httpClientSpy.get.and.returnValue(of(expected));
    const result: Incident = await service.get(expected.id);
    expect(result).toEqual(expected);
  });
});
