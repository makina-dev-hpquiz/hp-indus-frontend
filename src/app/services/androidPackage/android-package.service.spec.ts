import { TestBed } from '@angular/core/testing';

import { AndroidPackageService } from './android-package.service';

describe('AndroidPackageService', () => {
  let service: AndroidPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AndroidPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
