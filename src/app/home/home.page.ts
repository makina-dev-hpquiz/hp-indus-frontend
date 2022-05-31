import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // 192.168.1.11
  private apiUrl = "http://192.168.1.11:8082/apks/last"; 
  public lastAPKPath: string;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {

     this.getLastAPK();
  }

  async getLastAPK(){
    this.httpClient.get<any>(this.apiUrl).subscribe(data => {
     this.lastAPKPath = data.response;
  });


 
    // this.lastAPKPath = "../../assets/apk/app-debug.apk";
  }
}
