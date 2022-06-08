import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {

  protected readonly URL_SERVER = "http://192.168.43.20:8082/";

  constructor(protected httpClient: HttpClient) { }
}
