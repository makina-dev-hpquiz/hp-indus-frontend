import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {
  constructor(protected httpClient: HttpClient, protected logger: LogService) { }
}
