import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { IncidentConst } from 'src/constants/incidentConst';
import { IncidentProperty } from 'src/entities/IncidentProperty';
import { IncidentPropertiesService } from 'src/providers/services/incident-properties.service';

import { SearchToolbarComponent } from './search-toolbar.component';

describe('SearchToolbarComponent', () => {
  let component: SearchToolbarComponent;
  let fixture: ComponentFixture<SearchToolbarComponent>;
  let mockIncidentPropertiesService: jasmine.SpyObj<IncidentPropertiesService>;

  beforeEach(waitForAsync(() => {
    mockIncidentPropertiesService =
      jasmine.createSpyObj<IncidentPropertiesService>('IncidentPropertiesService', ['getTypes', 'getPriorities', 'getStatus']);

    TestBed.configureTestingModule({
      declarations: [SearchToolbarComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: IncidentPropertiesService,
          useValue: mockIncidentPropertiesService
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchToolbarComponent);
    component = fixture.componentInstance;
    component.incidentPropertiesService = mockIncidentPropertiesService;
    fixture.detectChanges();
  }));

  it('should create', async () => {

    const incidentType = new IncidentProperty(['type 1', 'type 2', 'type 3'], ['type 1', 'type 2', 'type 3'], 'type 1');

    await mockIncidentPropertiesService.getStatus.and.returnValue(of(incidentType).toPromise());
    await mockIncidentPropertiesService.getPriorities.and.returnValue(of(incidentType).toPromise());
    await mockIncidentPropertiesService.getTypes.and.returnValue(of(incidentType).toPromise());

    expect(component).toBeTruthy();
  });

  it('SearchToolbarComponent.sortByDate', () => {
    component.sortByDate();
    expect(component.filter.sort).toEqual(IncidentConst.reverseSortField);
  });

  it('SearchToolbarComponent.changeStatus', () => {
    const fakeButton = { fill: component.solidButton };
    const enCours = 'en cours';

    component.changeStatus(fakeButton, enCours);
    expect(component.filter.status).toEqual([enCours]);

  });

  it('SearchToolbarComponent.reduceOrExpendToolbar', () => {
    expect(component.toolbarIsActive).toBeTrue();
    component.reduceOrExpendToolbar();
    expect(component.toolbarIsActive).toBeFalse();
  });

  it('SearchToolbarComponent.displayReduceOrExpendButton', () => {
    expect(component.displayReduceOrExpendButton()).toBeFalse();
  });
});
