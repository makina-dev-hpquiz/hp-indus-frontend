import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AndroidPackage } from 'src/entities/androidPackage';

import { ApkTemplateComponent } from './apk-template.component';

describe('ApkTemplateComponent', () => {
  let component: ApkTemplateComponent;
  let fixture: ComponentFixture<ApkTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ApkTemplateComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApkTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('#initPicture', () => {
  let component: ApkTemplateComponent;
  let fixture: ComponentFixture<ApkTemplateComponent>;

  let hpCoreApk: AndroidPackage;
  let hpQuizApk: AndroidPackage;
  let otherApk: AndroidPackage;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ApkTemplateComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    hpCoreApk = new AndroidPackage('hp-core.apk', '16/05/2022 16:45', '4.62 Mo', '0');
    hpQuizApk = new AndroidPackage('hp-quiz.apk', '16/05/2022 16:45', '4.62 Mo', '0');
    otherApk = new AndroidPackage('other.apk', '16/05/2022 16:45', '4.62 Mo', '0');

    fixture = TestBed.createComponent(ApkTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Doit retourner l\'image correspondant à l\'application hpCoreAPK', () => {
    component.apk = hpCoreApk;
    component.initPicture();
    expect(component.picture).toEqual('../../assets/icon/build.svg');
  });
  it('Doit retourner l\'image correspondant à l\'application hpQuizAPK', () => {
    component.apk = hpQuizApk;
    component.initPicture();
    expect(component.picture).toEqual('../../assets/icon/harry_potter_app.png');
  });
  it('Doit retourner l\'image correspondant à l\'application hpCoreApk', () => {
    component.apk = otherApk;
    component.initPicture();
    expect(component.picture).toEqual('../../assets/icon/help-outline.svg');
  });

  it('L\'APK vaut null', () => {
    component.apk = null;
    component.initPicture();
    expect(component.picture).toEqual(undefined);
  });
});
