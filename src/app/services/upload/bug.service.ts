import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { Incident } from 'src/entities/incident';
import { AbstractService } from '../abstractService/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class BugService extends AbstractService{
  
  // URL Principal 
  private readonly BUG_URL ="bugs/";
  
  // URL Secondaire
  private readonly UPLOAD_URL ="upload";
  private readonly DELETE_URL ="delete/";

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Envoie une requête au serveur pour sauvegarder un bug
   * @param formData 
   * @returns 
   */
  public sendBug(formData) {
    return this.httpClient.post<any>(this.URL_SERVER+this.BUG_URL+this.UPLOAD_URL, formData, {
      reportProgress: true,
      observe: 'events'
    }); 
  }

  /**
   * Envoie une requête au serveur pour récupérer la liste complète des bugs
   * @returns 
   */
  public async getAllBugs(): Promise<Incident[]>{
    return await this.httpClient.get<any>(this.URL_SERVER+this.BUG_URL).toPromise();
  }

  /**
   * Envoie une requête au serveur pour supprimer un bug
   * @param id 
   * @returns 
   */
  public async deleteBugById(id: string): Promise<Incident[]>{
    return await this.httpClient.delete<any>(this.URL_SERVER+this.BUG_URL+this.DELETE_URL+id).toPromise();
  }

  
}


  
