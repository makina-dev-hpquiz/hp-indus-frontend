import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Incident } from 'src/entities/incident';
import { BugService } from '../services/upload/bug.service';

import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-screen-bugs',
  templateUrl: './screen-bugs.page.html',
  styleUrls: ['./screen-bugs.page.scss'],
})
export class ScreenBugsPage implements OnInit {
  
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  public incidents: Incident[];


  constructor(private BugService: BugService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.getBugs();
  }

  // sendScreenshot() {
  //   if(this.fileUpload.nativeElement.files.length > 0) {
  //     console.log("A envoyer")
  //   const formData = new FormData();
  //   formData.append('file', this.fileUpload.nativeElement.files[0]);
  //   this.BugService.sendBug(formData).subscribe((event: any) => {
   
  //     });
  //   } else { console.log("vide")}
  // }
 
  async getBugs(){
    this.incidents = await this.BugService.getAllBugs();
    console.log("getBugs");
    console.log(this.incidents);
  }
    
  openIncident(incident: Incident) {
    console.log(incident);
    this.dataService.setData(incident.id, incident);
    this.router.navigateByUrl('/incident/'+incident.id);
  }
}
