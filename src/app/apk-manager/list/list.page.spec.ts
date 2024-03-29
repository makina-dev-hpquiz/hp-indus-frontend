import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { AndroidPackage } from 'src/entities/androidPackage';
import { AndroidPackageService } from 'src/providers/services/android-package.service';
import { LatestAPKPage } from '../latest/latest-apk.page';

import { ListPage } from './list.page';

const mockAndroidPackageService =
  jasmine.createSpyObj<AndroidPackageService>('AndroidPackageService', ['getAllHPQuizAPK', 'getAllHPCoreAPK']);

const routes: Routes = [
  { path: 'apk', component: LatestAPKPage },
];

describe('ListPage', () => {
  let component: ListPage;
  let fixture: ComponentFixture<ListPage>;
  const apks = [
    new AndroidPackage('hp-core-latest.apk', '16/05/2022 16:45', '4.62 Mo', '0'),
    new AndroidPackage('hp-core-1.0.1.apk', '10/05/2022 16:45', '4.62 Mo', '0'),
  ];
  mockAndroidPackageService.getAllHPCoreAPK.and.returnValue(of(apks).toPromise());
  mockAndroidPackageService.getAllHPQuizAPK.and.returnValue(of([]).toPromise());
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPage ],
      imports: [IonicModule.forRoot() , RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: AndroidPackageService,
          useValue: mockAndroidPackageService
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create with data', async () => {
    expect(component).toBeTruthy();
    expect(2).toEqual(component.allHpCoreAPK.length);
    expect(component.allHpQuizAPK).toEqual([]);

  });

});
