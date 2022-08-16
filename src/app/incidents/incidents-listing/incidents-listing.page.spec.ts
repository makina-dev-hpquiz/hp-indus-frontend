import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { IncidentService } from 'src/providers/services/incident.service';

import { IncidentsListingPage } from './incidents-listing.page';

describe('Incidents listing', () => {
  let component: IncidentsListingPage;
  let fixture: ComponentFixture<IncidentsListingPage>;
  let mockIncidentService: jasmine.SpyObj<IncidentService>;

  beforeEach(waitForAsync(() => {
    mockIncidentService =
        jasmine.createSpyObj<IncidentService>('IncidentService', ['getAll']);


    TestBed.configureTestingModule({
      declarations: [ IncidentsListingPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: IncidentService,
          useValue: mockIncidentService
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentsListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    mockIncidentService.getAll.and.returnValue(of([]).toPromise());
    expect(component).toBeTruthy();
  });
});
