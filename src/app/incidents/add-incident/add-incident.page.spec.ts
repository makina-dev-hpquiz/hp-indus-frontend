import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { Incident } from 'src/entities/incident';
import { IncidentProperty } from 'src/entities/IncidentProperty';
import { IncidentPropertiesService } from 'src/providers/services/incident-properties.service';
import { IncidentService } from 'src/providers/services/incident.service';

import { AddIncidentPage } from './add-incident.page';

describe('AddIncidentPage', () => {
  let component: AddIncidentPage;
  let fixture: ComponentFixture<AddIncidentPage>;
  let mockIncidentService: jasmine.SpyObj<IncidentService>;
  let mockIncidentPropertiesService: jasmine.SpyObj<IncidentPropertiesService>;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  
  beforeEach(waitForAsync(() => {
    mockIncidentService = jasmine.createSpyObj<IncidentService>('IncidentService', ['get']);
    // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    mockIncidentPropertiesService = jasmine.createSpyObj<IncidentPropertiesService>('IncidentPropertiesService', ['getTypes', 'getPriorities', 'getStatus']);

    TestBed.configureTestingModule({
      declarations: [AddIncidentPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule],
      providers: [
        {
          provide: IncidentService,
          useValue: mockIncidentService
        },
        {
          provide: IncidentPropertiesService,
          useValue: mockIncidentPropertiesService
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddIncidentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async () => {

    const incident = new Incident('f0de50b4-a33a-4cde-8587-876a9e8851ab',
      'Test 1',
      'Description du test 1',
      '',
      '',
      'normal',
      new Date('2022-06-07T16:00:00.135Z'),
      new Date('2022-06-07T16:00:00.135Z'),
      'interface'
    );
    const incidentProperty = new IncidentProperty(['type 1', 'type 2'], ['type 1', 'type 2', 'type 3'], 'type 1');


    await mockIncidentService.get.and.returnValue(of(incident).toPromise());
    await mockIncidentPropertiesService.getPriorities.and.returnValue(of(incidentProperty).toPromise());
    await mockIncidentPropertiesService.getStatus.and.returnValue(of(incidentProperty).toPromise());
    await mockIncidentPropertiesService.getTypes.and.returnValue(of(incidentProperty).toPromise());

    expect(component).toBeTruthy();
  });
});
