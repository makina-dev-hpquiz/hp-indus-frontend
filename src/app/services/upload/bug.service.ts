import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { Incident } from 'src/entities/incident';

@Injectable({
  providedIn: 'root'
})
export class BugService {
  // 192.168.1.11
  serverUrl: string = "http://192.168.1.11:8082/bugs";
  constructor(private httpClient: HttpClient) { }

  public sendBug(formData) {
    return this.httpClient.post<any>(this.serverUrl+"/upload", formData, {
      reportProgress: true,
      observe: 'events'
    }); 
  }

  public async getAllBugs(): Promise<Incident[]>{
    return await this.httpClient.get<any>(this.serverUrl).toPromise();
  }


  public async deleteBugById(id: string): Promise<Incident[]>{
    return await this.httpClient.delete<any>(this.serverUrl+"/delete/"+id).toPromise();
  }

  
}
