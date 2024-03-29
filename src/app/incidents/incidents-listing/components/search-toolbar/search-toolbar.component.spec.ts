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

  // Nom de propriétés privées
  const selectedStatus = 'selectedStatus';
  const logoRecentDate = 'logoRecentDate';
  const logoOldDate = 'logoOldDate';
  const logoReduceToolbar = 'logoReduceToolbar';
  const logoExpendToolbar = 'logoExpendToolbar';

  const logoStateImage = 'logoStateImage';
  const textStateImage = 'textStateImage';
  const logoHiddenImage = 'logoHiddenImage';
  const logoDisplayImage = 'logoDisplayImage';
  const textHiddenImage = 'textHiddenImage';
  const textDisplayImage = 'textDisplayImage';

  const getInverseFillButton = 'getInverseFillButton';

  beforeEach(waitForAsync(async () => {
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
    fixture.detectChanges();
  }));

  it('should create', async () => {
    const incidentProperties = new IncidentProperty(['type 1', 'type 2', 'type 3'], ['type 1', 'type 2', 'type 3', 'type 4'], 'type 1');

    await mockIncidentPropertiesService.getStatus.and.returnValue(of(incidentProperties).toPromise());
    await mockIncidentPropertiesService.getPriorities.and.returnValue(of(incidentProperties).toPromise());
    await mockIncidentPropertiesService.getTypes.and.returnValue(of(incidentProperties).toPromise());

    await component.init();

    expect(component).toBeTruthy();
    expect(component.incidentPropertiesService).toBeTruthy();
    expect(incidentProperties.searchProperties).toEqual(component.priorities);
    expect(incidentProperties.searchProperties).toEqual(component.types);

    expect(incidentProperties.properties).toContain(component.doneMsg);
    expect(incidentProperties.properties).toContain(component.doingMsg);
    expect(incidentProperties.properties).toContain(component.toDoMsg);
    expect(incidentProperties.properties[0]).toContain(component[selectedStatus][0]);
    expect(incidentProperties.properties[1]).toContain(component[selectedStatus][1]);

    expect(IncidentConst.sortField).toEqual(component.filter.sort);
    expect('').toEqual(component.filter.search);
    expect([component[selectedStatus][0], component[selectedStatus][1]]).toEqual(component.filter.status);
    expect(incidentProperties.searchProperties[0]).toEqual(component.filter.priority);
    expect(incidentProperties.searchProperties[0]).toEqual(component.filter.type);

  });

  it('TEST SearchToolbarComponent.updateSearch()', () => {
    spyOn(component.incidentFilterUpdated, 'emit');
    component.updateSearch();
    expect(component.incidentFilterUpdated.emit).toHaveBeenCalled();
  });

  it('TEST SearchToolbarComponent.sortByDate', () => {
    expect(component[logoRecentDate]).toEqual(component.logoSortedDate);
    component.sortByDate();
    expect(component.filter.sort).toEqual(IncidentConst.reverseSortField);
    expect(component[logoOldDate]).toEqual(component.logoSortedDate);
  });

  it('TEST SearchToolbarComponent.changeStatus', () => {
    const enCours = 'en cours';

    component.changeStatus(enCours);
    expect(component.filter.status).toEqual([enCours]);
    expect(component[selectedStatus]).toContain(enCours);
  });

  it('TEST SearchToolbarComponent.reduceOrExpendToolbar', () => {
    expect(component[logoReduceToolbar]).toEqual(component.logoReduceToolbarToDisplay);
    expect(component.toolbarIsActive).toBeTrue();
    component.reduceOrExpendToolbar();
    expect(component.toolbarIsActive).toBeFalse();
    expect(component[logoExpendToolbar]).toEqual(component.logoReduceToolbarToDisplay);
  });

  it('TEST SearchToolbarComponent.displayReduceOrExpendButton avec windows.screen.height normal et à 599', () => {
    expect(component.isSmallScreen()).toBeFalse();
    const spy = spyOnProperty(window, 'screen', ).and.returnValue({height : 599});
    expect(component.isSmallScreen()).toBeTrue();

    spy.and.returnValue({height : 600});
    expect(component.isSmallScreen()).toBeFalse();

    spy.and.returnValue({width : 919});
    expect(component.isSmallScreen()).toBeTrue();

    spy.and.returnValue({width : 920});
    expect(component.isSmallScreen()).toBeFalse();
  });

  it('TEST SearchToolbarComponent.displayImage', () => {
    const displayImageEmitter = spyOn(component.displayImageEmitter, 'emit');

    expect(component[logoStateImage]).toEqual(component[logoHiddenImage]);
    expect(component[textStateImage]).toEqual(component[textHiddenImage]);
    expect(component.imageIsDisplayed).toBeTrue();

    component.displayImage();
    expect(displayImageEmitter).toHaveBeenCalled();
    expect(component.imageIsDisplayed).toBeFalse();
    expect(component[logoStateImage]).toEqual(component[logoDisplayImage]);
    expect(component[textStateImage]).toEqual(component[textDisplayImage]);

    component.displayImage();
    expect(component[logoStateImage]).toEqual(component[logoHiddenImage]);
    expect(component[textStateImage]).toEqual(component[textHiddenImage]);
    expect(component.imageIsDisplayed).toBeTrue();
    expect(displayImageEmitter).toHaveBeenCalledTimes(2);

  });

  it('TEST private SearchToolbarComponent.getInverseFillButton', () => {
    let result = component[getInverseFillButton](component.solidButton);
    expect(result).toEqual(component.outlineButton);
    result = component[getInverseFillButton](component.outlineButton);
    expect(result).toEqual(component.solidButton);
  });

});
