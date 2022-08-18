import { HttpClient } from '@angular/common/http';

import { AndroidPackageService } from './android-package.service';
import { AndroidPackage } from 'src/entities/androidPackage';
import { of } from 'rxjs';
import { LogService } from './log.service';

describe('AndroidPackageService', () => {
  let service: AndroidPackageService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new AndroidPackageService(httpClientSpy, new LogService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('TEST getLastHPCoreAPK', async () => {
    const expected = new AndroidPackage('hp-core-latest.apk', '16/05/2022 16:45', '4.62 Mo', '0');
    httpClientSpy.get.and.returnValue(of(expected));

    const result: AndroidPackage = await service.getLastHPCoreAPK();
    expect(result).toEqual(expected);
  });

  it('TEST getLastHPQuizAPK', async () => {
    const expected = new AndroidPackage('hp-quiz-latest.apk', '16/05/2022 16:45', '4.62 Mo', '0');
    httpClientSpy.get.and.returnValue(of(expected));

    const result: AndroidPackage = await service.getLastHPQuizAPK();
    expect(result).toEqual(expected);
  });

  it('TEST getAllHPCoreAPK', async () => {
    const expected = [
      new AndroidPackage('hp-core-latest.apk', '16/05/2022 16:45', '4.62 Mo', '0'),
      new AndroidPackage('hp-core-1.0.1.apk', '10/05/2022 16:45', '4.62 Mo', '0'),
  ];
    httpClientSpy.get.and.returnValue(of(expected));

    const result: AndroidPackage[] = await service.getAllHPCoreAPK();
    expect(result).toEqual(expected);
  });

  it('TEST getAllHPQuizAPK', async () => {
    const expected = [
      new AndroidPackage('hp-quiz-latest.apk', '16/05/2022 16:45', '4.62 Mo', '0'),
      new AndroidPackage('hp-quiz-1.0.2.apk', '12/05/2022 16:45', '4.62 Mo', '0'),
      new AndroidPackage('hp-quiz-1.0.1.apk', '10/05/2022 16:45', '4.62 Mo', '0')
  ];
    httpClientSpy.get.and.returnValue(of(expected));

    const result: AndroidPackage[] = await service.getAllHPQuizAPK();
    expect(result).toEqual(expected);
  });
});
