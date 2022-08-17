import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { IncidentProperty } from 'src/entities/IncidentProperty';
import { IncidentPropertiesService } from 'src/providers/services/incident-properties.service';

import { SearchToolbarComponent } from './search-toolbar.component';

describe('SearchToolbarComponent', () => {
  let component: SearchToolbarComponent;
  let fixture: ComponentFixture<SearchToolbarComponent>;
  let mockIncidentPropertiesService: jasmine.SpyObj<IncidentPropertiesService>;

  beforeEach(waitForAsync(() => {
    mockIncidentPropertiesService = jasmine.createSpyObj<IncidentPropertiesService>('IncidentPropertiesService', ['getTypes', 'getPriorities', 'getStatus', 'get']);

    TestBed.configureTestingModule({
      declarations: [ SearchToolbarComponent ],
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
    incidentType.properties = ['type 1', 'type 2', 'type 3'];

    await mockIncidentPropertiesService.getStatus.and.returnValue(of(incidentType).toPromise());
    await mockIncidentPropertiesService.getPriorities.and.returnValue(of(incidentType).toPromise());
    await mockIncidentPropertiesService.getTypes.and.returnValue(of(incidentType).toPromise());

    expect(component).toBeTruthy();
  });

  // it('SearchToolbarComponent.updateSearch', () => {
  
  // });

  
  // it('SearchToolbarComponent.sortByDate', () => {
  
  // });

  
  // it('SearchToolbarComponent.changeStatus', () => {
  
  // });

  // it('SearchToolbarComponent.reduceOrExpendToolbar', () => {
  
  // });
  // it('SearchToolbarComponent.displayReduceOrExpendButton', () => {
  
  // });
});
