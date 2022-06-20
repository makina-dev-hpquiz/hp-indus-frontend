import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { AndroidPackage } from 'src/entities/androidPackage';
import { AndroidPackageService } from '../services/androidPackage/android-package.service';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockAndroidPackageService: jasmine.SpyObj<AndroidPackageService>;

  beforeEach(waitForAsync(() => {
    mockAndroidPackageService =
        jasmine.createSpyObj<AndroidPackageService>('AndroidPackageService', ['getLastHPQuizAPK', 'getLastHPCoreApk']);

    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: AndroidPackageService,
          useValue: mockAndroidPackageService
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    const apk = new AndroidPackage('hp-core.apk', '16/05/2022 16:45', '4.62 Mo', '0');

    mockAndroidPackageService.getLastHPQuizAPK.and.returnValue(of(apk).toPromise());
    mockAndroidPackageService.getLastHPCoreApk.and.returnValue(of(apk).toPromise());
    expect(component).toBeTruthy();
  });
});


