import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
  const addIncident = 'addIncident';
  const updateIncident = 'updateIncident';
  const formValueIsComplete = 'formValueIsComplete';
  const generateIncidentFormData = 'generateIncidentFormData';
  const getIncident = 'getIncident';
  const deleteIncident = 'deleteIncident';
  const presentToast = 'presentToast';
  // Nom de propriétés privées
  const router = 'router';
  const incidentPage = 'incidentsPage';
  const route = 'route';

  // DATA TESTING
  const currentDate = new Date();

  const formValue = {
    id: 'f0de50b4-a33a-4cde-8587-876a9e8851ab',
    title: 'Test 1',
    description: 'Description du test 1',
    screenshotPath: '',
    screenshotWebPath: '',
    priority: 'normal',
    createdAt: currentDate.toISOString(),
    updatedAt: currentDate.toISOString(),
    type: 'interface',
    status: 'en cours'
  };

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


    // mockImageInputComponent.getFile.and.returnValue(of(fakeFile));

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

  it('Est initialisé avec l\'état NEW', async () => {
    const incidentProperty = new IncidentProperty(['type 1', 'type 2'], ['type 1', 'type 2', 'type 3'], 'type 1');

    await mockIncidentPropertiesService.getPriorities.and.returnValue(of(incidentProperty).toPromise());
    await mockIncidentPropertiesService.getStatus.and.returnValue(of(incidentProperty).toPromise());
    await mockIncidentPropertiesService.getTypes.and.returnValue(of(incidentProperty).toPromise());

    await component.ngOnInit();
    expect(component).toBeTruthy();

    expect(incidentProperty.properties).toEqual(component.prioritiesList);
    expect(incidentProperty.properties).toEqual(component.statusList);
    expect(incidentProperty.properties).toEqual(component.typesList);

    expect(incidentProperty.defaultProperty).toEqual(component.incident.status);
    expect(incidentProperty.defaultProperty).toEqual(component.incident.priority);

    expect(component.stateNew).toEqual(component.state);

    // La date de création doit être la même que la date de mise à jour
    expect(component.incident.createdAt.toISOString()).toEqual(component.createdAt);
    expect(component.createdAt).toEqual(component.updatedAt);

    // Les valeurs screenshotPath / screenshotWebPath / description sont initialisées à ""
    expect('').toEqual(component.incident.screenshotPath);
    expect('').toEqual(component.incident.screenshotWebPath);
    expect('').toEqual(component.incident.description);
  });

  it('Est initialisé avec l\'état UPDATE', async () => {
    const incidentProperty = new IncidentProperty(['type 1', 'type 2'], ['type 1', 'type 2', 'type 3'], 'type 1');

    incident.screenshotWebPath = 'localhost:8080/images/img.jpg';

    await mockIncidentService.get.and.returnValue(of(incident).toPromise());
    await mockIncidentPropertiesService.getPriorities.and.returnValue(of(incidentProperty).toPromise());
    await mockIncidentPropertiesService.getStatus.and.returnValue(of(incidentProperty).toPromise());
    await mockIncidentPropertiesService.getTypes.and.returnValue(of(incidentProperty).toPromise());

    const id = 'f0de50b4-a33a-4cde-8587-876a9e8851ab';
    component[route].snapshot.data.special = id;

    await component.ngOnInit();
    expect(component).toBeTruthy();

    expect(incidentProperty.properties).toEqual(component.prioritiesList);
    expect(incidentProperty.properties).toEqual(component.statusList);
    expect(incidentProperty.properties).toEqual(component.typesList);

    expect(component.stateUpdate).toEqual(component.state);
    expect(id).toEqual(component.incident.id);

    expect(component.incident.screenshotWebPath).toEqual(component.screenshot);
    expect(component.incident.createdAt.toISOString()).toEqual(component.createdAt);
    expect(component.incident.updatedAt.toISOString()).toEqual(component.updatedAt);
  });

  it('TEST public AddIncidentPage.saveAction', async () => {
    component.state = component.stateNew;

    const addIncidentSpy = spyOn<any>(component, addIncident);
    const updateIncidentSpy = spyOn<any>(component, updateIncident);

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
    component.state = component.stateUpdate;
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
    component.createdAt = '2022-08-23T10:40:00.000Z';
    expect(component.updatedAt).toBeFalsy();

    component.updateDate();
    expect(component.createdAt).toEqual(component.updatedAt);

    const dateStr = '2022-08-22T15:30:00+04:00';
    const date = new Date(dateStr);

    component.createdAt = dateStr;
    component.updateDate();

    expect(date.toISOString()).toEqual(component.createdAt);
    expect(date.toISOString()).toEqual(component.updatedAt);
  });

  it('TEST public AddIncidentPage.deleteIncident avec confirm == true', async () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    let t: any;
    mockIncidentService.deleteById.and.returnValue(of(t).toPromise());
    await component[deleteIncident]();
    expect(component[incidentPage]).toEqual(component[router].url);
    expect(component[router].navigated).toBeTrue();
  });

  it('TEST public AddIncidentPage.deleteIncident avec confirm == false', async () => {
    spyOn(window, 'confirm').and.callFake(() =>  false);
    let t: any;
    mockIncidentService.deleteById.and.returnValue(of(t).toPromise());
    await component[deleteIncident]();
    expect(component[router].navigated).toBeFalse();
  });

  it('TEST public AddIncidentPage.cancelImage retire les images de l\'objet incident', () => {

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
    const presentToastSpy = spyOn<any>(component, presentToast);
    const incidentUseOnFormValue = new Incident('f0de50b4-a33a-4cde-8587-876a9e8851ab');
    component.createdAt = '';
    component.incident = incidentUseOnFormValue;

    expect(component[formValueIsComplete]()).toBeFalse();
    expect(presentToastSpy).toHaveBeenCalledTimes(1);

    component.incident.title = 'TITRE';
    expect(component[formValueIsComplete]()).toBeFalse();
    expect(presentToastSpy).toHaveBeenCalledTimes(2);

    component.incident.description = 'DESCRIPTION';
    expect(component[formValueIsComplete]()).toBeFalse();
    expect(presentToastSpy).toHaveBeenCalledTimes(3);

    component.incident.type = 'TYPE';
    expect(component[formValueIsComplete]()).toBeFalse();
    expect(presentToastSpy).toHaveBeenCalledTimes(4);

    component.incident.status = 'STATUT';
    expect(component[formValueIsComplete]()).toBeFalse();
    expect(presentToastSpy).toHaveBeenCalledTimes(5);

    component.incident.priority = 'PRIORITY';
    expect(component[formValueIsComplete]()).toBeFalse();
    expect(presentToastSpy).toHaveBeenCalledTimes(6);

    component.createdAt = new Date().toISOString();
    expect(component[formValueIsComplete]()).toBeTrue();
    expect(presentToastSpy).toHaveBeenCalledTimes(6);
  });

  it('TEST private AddIncidentPage.addIncident sauvegarde un incident et retourne à la page liste des incidents', async () => {
    mockIncidentService.save.and.returnValue(of(incident).toPromise());
    mockImageInputComponent.getFile.and.returnValue([]);
    component.imageInput = mockImageInputComponent;

    await component[addIncident](component[generateIncidentFormData](formValue));

    expect(component[incidentPage]).toEqual(component[router].url);
  });

  it('TEST private AddIncidentPage.updateIncident met à jour un incident et retourne à la page liste des incidents', async () => {
    mockIncidentService.update.and.returnValue(of(incident).toPromise());
    mockImageInputComponent.getFile.and.returnValue([]);
    component.imageInput = mockImageInputComponent;

    await component[updateIncident](component[generateIncidentFormData](formValue));

    expect(component[incidentPage]).toEqual(component[router].url);
  });

  it('TEST private AddIncidentPage.getIncident() récupère un incident', async () => {
    mockIncidentService.get.and.returnValue(of(incident).toPromise());
    const result = await component[getIncident]('f0de50b4-a33a-4cde-8587-876a9e8851ab');
    expect(result).toEqual(incident);
  });

  it('TEST private presentToast', () => {
    // Not impl.
  });

  it('TEST private AddIncidentPage.generateIncidentFormData ', async () => {

  //Initialisation blob mock
  const lastModifiedDate = 'lastModifiedDate';
  const name = 'name';

  const typeFile = 'image/jpeg';
  const blob = new Blob([], { type: typeFile });
  blob[lastModifiedDate] = '';
  blob[name] = 'file.jpg';

  const fakeFile = blob as File;

    mockImageInputComponent.getFile.and.returnValue(fakeFile);
    component.imageInput = mockImageInputComponent;

    let result = component[generateIncidentFormData](formValue);
    let resutltFile: string = ((result.get('file') as Blob) as File).type;
    let resutltTitle: string = result.get('title') as string;

    expect(typeFile).toEqual(resutltFile);
    expect('Test 1').toEqual(resutltTitle);

    mockImageInputComponent.getFile.and.returnValue([]);
    result = component[generateIncidentFormData](formValue);
    resutltFile = ((result.get('file') as Blob) as File).type;
    resutltTitle = result.get('title') as string;

    expect(undefined).toEqual(resutltFile);
    expect('Test 1').toEqual(resutltTitle);
  });


});
