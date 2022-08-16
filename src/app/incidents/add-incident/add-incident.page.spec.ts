import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { Incident } from 'src/entities/incident';
import { IncidentService } from 'src/providers/services/incident.service';

import { AddIncidentPage } from './add-incident.page';

describe('AddIncidentPage', () => {
  let component: AddIncidentPage;
  let fixture: ComponentFixture<AddIncidentPage>;
  let mockIncidentService: jasmine.SpyObj<IncidentService>;

  beforeEach(waitForAsync(() => {
    mockIncidentService =
      jasmine.createSpyObj<IncidentService>('IncidentService', ['get']);

    TestBed.configureTestingModule({
      declarations: [AddIncidentPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule],
      providers: [
        {
          provide: IncidentService,
          useValue: mockIncidentService
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddIncidentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {

    const incident = new Incident('f0de50b4-a33a-4cde-8587-876a9e8851ab',
      'Test 1',
      'Description du test 1',
      '',
      '',
      'normal',
      new Date('2022-06-07T16:00:00.135Z'),
      'interface'
    );

    mockIncidentService.get.and.returnValue(of(incident).toPromise());
    expect(component).toBeTruthy();
  });
});
