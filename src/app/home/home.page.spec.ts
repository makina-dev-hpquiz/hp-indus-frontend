import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { AndroidPackage } from 'src/entities/androidPackage';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AndroidPackageService } from 'src/providers/services/android-package.service';


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockAndroidPackageService: jasmine.SpyObj<AndroidPackageService>;

  beforeEach(waitForAsync(() => {
    mockAndroidPackageService =
        jasmine.createSpyObj<AndroidPackageService>('AndroidPackageService', ['getLastHPQuizAPK', 'getLastHPCoreAPK']);

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
    mockAndroidPackageService.getLastHPCoreAPK.and.returnValue(of(apk).toPromise());
    expect(component).toBeTruthy();
  });
});


