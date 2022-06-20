import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AbstractService } from './abstract.service';

describe('AbstractService', () => {
  let service: AbstractService;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    }).compileComponents();
    service = TestBed.inject(AbstractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
