import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { Incident } from 'src/entities/incident';
import { IncidentFilter } from 'src/entities/incidentFilter';
import { IncidentService } from 'src/providers/services/incident.service';
import { LogService } from 'src/providers/services/log.service';

import { IncidentsListingPage } from './incidents-listing.page';

describe('Incidents listing', () => {
  let component: IncidentsListingPage;
  let fixture: ComponentFixture<IncidentsListingPage>;
  let mockIncidentService: jasmine.SpyObj<IncidentService>;

   // Nom de propriétés privées
   const router = 'router';
   const dataService = 'dataService';

  beforeEach(waitForAsync(() => {
    mockIncidentService =
      jasmine.createSpyObj<IncidentService>('IncidentService', ['getAll']);


    TestBed.configureTestingModule({
      declarations: [IncidentsListingPage],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: IncidentService,
          useValue: mockIncidentService
        },
        {
          provide: LogService,
          useValue: new LogService()
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentsListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {

    const incidents = [
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

    mockIncidentService.getAll.and.returnValue(of(incidents).toPromise());
    expect(component).toBeTruthy();
  });

  it('TEST public IncidentsListingPage.displayDate', () => {
    const currentDate = new Date();
    const incident = new Incident();
    incident.updatedAt = currentDate;

    let result = component.displayDate(incident);
    expect(currentDate.toLocaleDateString()).toEqual(result);

    result = component.displayDate(null);
    expect('').toEqual(result);

  });

  it('TEST public IncidentsListingPage.getAllIncidents', async () => {
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

    mockIncidentService.getAll.and.returnValue(of(expected).toPromise());
    await component.getAllIncidents(new IncidentFilter());
    expect(component.incidents).toEqual(expected);
  });

  it('TEST public IncidentsListingPage.openIncident', async () => {
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
    await component.openIncident(incident);
    expect(incident).toEqual(component[dataService].getData(incident.id));
    expect('/incident/'+incident.id).toEqual(component[router].url);
    expect(component[router].navigated).toBeTrue();
  });

  it('TEST public IncidentsListingPage.getIncidentNumber', () => {
    let result = component.getIncidentNumber();
    expect(0).toEqual(result);

    component.incidents = [
      new Incident(),
      new Incident()
    ];

    result = component.getIncidentNumber();
    expect(2).toEqual(result);
  });

  it('TEST public IncidentsListingPage.displayImage', () => {
    expect(component.imageIsDisplayed).toBeTrue();
    component.displayImage(false);
    expect(component.imageIsDisplayed).toBeFalse();
    component.displayImage(true);
    expect(component.imageIsDisplayed).toBeTrue();
  });
});
