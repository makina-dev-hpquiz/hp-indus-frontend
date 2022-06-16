import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConst } from 'src/constants/serverConsts';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {
  constructor(protected httpClient: HttpClient) { }
}
