import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { Incident } from 'src/entities/incident';
import { IncidentProperty } from 'src/entities/IncidentProperty';
import { IncidentPropertiesService } from 'src/providers/services/incident-properties.service';
import { IncidentService } from 'src/providers/services/incident.service';
import { LogService } from 'src/providers/services/log.service';

import { AddIncidentPage } from './add-incident.page';
import { ImageInputComponent } from './components/image-input/image-input.component';

import { routes } from 'src/app/app-routing.module';

describe('AddIncidentPage', () => {
  let component: AddIncidentPage;
  let fixture: ComponentFixture<AddIncidentPage>;
  let mockIncidentService: jasmine.SpyObj<IncidentService>;
  let mockIncidentPropertiesService: jasmine.SpyObj<IncidentPropertiesService>;
  let mockImageInputComponent: jasmine.SpyObj<ImageInputComponent>;

  // Nom de méthodes privées
  let addIncident = 'addIncident';
  let updateIncident = 'updateIncident';
  let formValueIsComplete = 'formValueIsComplete';
  let generateIncidentFormData = 'generateIncidentFormData';
  let getIncident = 'getIncident';
  let deleteIncident = 'deleteIncident';
  // Nom de propriétés privées 
  let router = 'router';
  let incidentPage = 'INCIDENTS_PAGE';

  // DATA TESTING
  const currentDate = new Date();

  const formValue = {
    'id': 'f0de50b4-a33a-4cde-8587-876a9e8851ab',
    'title': 'Test 1',
    'description': 'Description du test 1',
    'screenshotPath': '',
    'screenshotWebPath': '',
    'priority': 'normal',
    'createdAt': currentDate.toISOString(),
    'updatedAt': currentDate.toISOString(),
    'type': 'interface',
    'status': 'en cours'
  }

  const incident = new Incident('f0de50b4-a33a-4cde-8587-876a9e8851ab',
    'Test 1',
    'Description du test 1',
    '',
    '',
    'normal',
    currentDate,
    currentDate,
    'interface',
    'en cours'
  );

  beforeEach(waitForAsync(() => {
    mockIncidentService = jasmine.createSpyObj<IncidentService>('IncidentService', ['get', 'save', 'update', 'deleteById']);
    mockIncidentPropertiesService =
      jasmine.createSpyObj<IncidentPropertiesService>('IncidentPropertiesService', ['getTypes', 'getPriorities', 'getStatus']);
    mockImageInputComponent =
      jasmine.createSpyObj<ImageInputComponent>('ImageInputComponent', ['getFile']);

    TestBed.configureTestingModule({
      declarations: [AddIncidentPage],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes), FormsModule],
      providers: [
        {
          provide: IncidentService,
          useValue: mockIncidentService
        },
        {
          provide: IncidentPropertiesService,
          useValue: mockIncidentPropertiesService
        },
        {
          provide: LogService,
          useValue: new LogService()
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AddIncidentPage);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  }));

  it('should create', async () => {
    const incidentProperty = new IncidentProperty(['type 1', 'type 2'], ['type 1', 'type 2', 'type 3'], 'type 1');

    await mockIncidentService.get.and.returnValue(of(incident).toPromise());
    await mockIncidentPropertiesService.getPriorities.and.returnValue(of(incidentProperty).toPromise());
    await mockIncidentPropertiesService.getStatus.and.returnValue(of(incidentProperty).toPromise());
    await mockIncidentPropertiesService.getTypes.and.returnValue(of(incidentProperty).toPromise());

    expect(component).toBeTruthy();
    //TODO Rajouter de expect  
  });

  it('TEST public AddIncidentPage.saveAction', async () => {
    component.imageInput = mockImageInputComponent;
    mockImageInputComponent.getFile.and.returnValue(of(''));

    component.state = component.STATE_NEW;
    
    let addIncidentSpy = spyOn<any>(component, addIncident);
    let updateIncidentSpy = spyOn<any>(component, updateIncident);

    // TEST Création Incident avec un objet Incident INcomplet
    await component.saveAction(formValue);
    expect(addIncidentSpy).toHaveBeenCalledTimes(0);
    expect(updateIncidentSpy).toHaveBeenCalledTimes(0);

    // TEST Création Incident avec un objet Incident complet
    component.incident = incident;
    await component.saveAction(formValue);
    expect(addIncidentSpy).toHaveBeenCalledTimes(1);
    expect(updateIncidentSpy).toHaveBeenCalledTimes(0);

    
    // TEST Mise à jour Incident avec un objet Incident Incomplet
    component.state = component.STATE_UPDATE;
    await component.saveAction(formValue);
    expect(addIncidentSpy).toHaveBeenCalledTimes(1);
    expect(updateIncidentSpy).toHaveBeenCalledTimes(1);

    // TEST Mise à jour Incident avec un objet Incident Incomplet
    component.incident.status = '';
    await component.saveAction(formValue);
    expect(addIncidentSpy).toHaveBeenCalledTimes(1);
    expect(updateIncidentSpy).toHaveBeenCalledTimes(1);
  });

  it('TEST public AddIncidentPage.updateDate', () => {
    component.updatedAt = '';
    component.createdAt = '18/08/2022';
    expect(component.updatedAt).toBeFalsy();

    component.updateDate();
    expect(component.createdAt).toEqual(component.createdAt);
  });

  it('TEST public AddIncidentPage.deleteIncident', async () => {
    spyOn(window, 'confirm').and.callFake(function () {
      return true;
    });
    let t: any;
    mockIncidentService.deleteById.and.returnValue(of(t).toPromise());
    await component[deleteIncident]();
    expect(component[incidentPage]).toEqual(component[router].url);
  });

  it('TEST public AddIncidentPage.cancelImage', () => {

    const screenshotPath = 'src/content/img1.jpg';
    const screenshotWebPath = 'localhost:8080/images/img1.jpg';
    const emptyString = '';

    component.incident.screenshotPath = screenshotPath;
    component.incident.screenshotWebPath = screenshotWebPath;

    expect(component.incident.screenshotPath).toEqual(screenshotPath);
    expect(component.incident.screenshotWebPath).toEqual(screenshotWebPath);
    component.cancelImage();
    expect(component.incident.screenshotPath).toEqual(emptyString);
    expect(component.incident.screenshotWebPath).toEqual(emptyString);
  });

  it('TEST private AddIncidentPage.formValueIsComplete', () => {
    const incident = new Incident('f0de50b4-a33a-4cde-8587-876a9e8851ab');
    component.incident = incident;
    expect(component[formValueIsComplete]()).toBeFalse();

    component.incident.title = 'TITRE';
    expect(component[formValueIsComplete]()).toBeFalse();

    component.incident.description = 'DESCRIPTION';
    expect(component[formValueIsComplete]()).toBeFalse();

    component.incident.type = 'TYPE';
    expect(component[formValueIsComplete]()).toBeFalse();


    component.incident.status = 'STATUT';
    expect(component[formValueIsComplete]()).toBeFalse();


    component.incident.priority = 'PRIORITY';
    expect(component[formValueIsComplete]()).toBeTrue();

  });

  it('TEST private AddIncidentPage.addIncident', async () => {
    mockIncidentService.save.and.returnValue(of(incident).toPromise());
    component.imageInput = mockImageInputComponent;
    mockImageInputComponent.getFile.and.returnValue(of(''));
    await component[addIncident](component[generateIncidentFormData](formValue));

    expect(component[incidentPage]).toEqual(component[router].url);
  });

  it('TEST private AddIncidentPage.updateIncident', async () => {
    mockIncidentService.update.and.returnValue(of(incident).toPromise());
    component.imageInput = mockImageInputComponent;
    mockImageInputComponent.getFile.and.returnValue(of(''));
    await component[updateIncident](component[generateIncidentFormData](formValue));

    expect(component[incidentPage]).toEqual(component[router].url);
  });

  it('TEST private AddIncidentPage.getIncident()', async () => {
    mockIncidentService.get.and.returnValue(of(incident).toPromise());
    let result = await component[getIncident]('f0de50b4-a33a-4cde-8587-876a9e8851ab');
    expect(result).toEqual(incident);
  });

  it('TEST private presentToast', () => {
    // TODO A Impl.
  });

  it('TEST private generateIncidentFormData', () => {
    component.imageInput = mockImageInputComponent;
    mockImageInputComponent.getFile.and.returnValue(of(''));

    let result = component[generateIncidentFormData](formValue);

    let resutltFile: string = (result.get('file') as File).name
    let resutltTitle: string = result.get('title') as string;
    
    expect(undefined).toEqual(resutltFile);
    expect('Test 1').toEqual(resutltTitle);

    //TODO Impl. des tests plus approfondies lorsqu'il y a un fichier et lorsqu'il y en a pas 
  });


});
