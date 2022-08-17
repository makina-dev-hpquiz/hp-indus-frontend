import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchToolbarComponent } from './search-toolbar.component';

describe('SearchToolbarComponent', () => {
  let component: SearchToolbarComponent;
  let fixture: ComponentFixture<SearchToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchToolbarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SearchToolbarComponent.updateSearch', () => {
  
  });

  
  it('SearchToolbarComponent.sortByDate', () => {
  
  });

  
  it('SearchToolbarComponent.changeStatus', () => {
  
  });

  it('SearchToolbarComponent.reduceOrExpendToolbar', () => {
  
  });
  it('SearchToolbarComponent.displayReduceOrExpendButton', () => {
  
  });
});
