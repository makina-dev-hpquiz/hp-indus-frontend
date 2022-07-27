import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/entities/incident';
import { BugService } from '../services/upload/bug.service';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.page.html',
  styleUrls: ['./add-incident.page.scss'],
})
export class AddIncidentPage implements OnInit {

  public havePicture = false;
  public screenshot;
  private displayNone = 'none';
  private displayBlock = 'block';

  public incident: Incident;

  public types: string[];
  public defaultPriority;

  public state: string;

  public readonly STATE_NEW: string; // = 'NEW';
  public readonly STATE_UPDATE = 'UPDATE';

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  // @ViewChild("viewer", {static: false}) viewer: ElementRef;
  @ViewChild('inputDiv', {static: false}) inputDiv: ElementRef;
  @ViewChild('viewerDiv', {static: false}) viewerDiv: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private bugService: BugService) {
    this.incident = new Incident();
    this.types = ['Interface', 'Orthographe', 'Evenement'];
    this.defaultPriority = 'normal';

    // this.STATE_NEW = 'NEW';
    this. STATE_UPDATE = 'UPDATE';
    this.state = this.STATE_NEW;
  }

  data: any;

  ngOnInit() {
    this.incident = new Incident();
    if (this.route.snapshot.data.special) {
      this.incident = this.route.snapshot.data.special;
      this.screenshot = this.incident.screenshotWebPath;
      this.state = this.STATE_UPDATE;
      
    console.log(this.incident);
    } else {
      this.state = this.STATE_NEW;
      this.incident = new Incident();
      this.incident.priority = this.defaultPriority;
      this.incident.date = new Date().toISOString();
      
    console.log(this.incident);
    }
  }

  ionViewWillEnter(){
    if(this.state === this.STATE_UPDATE) {
     this.displayScreenshot();
    }
  }


  async addIncident(){
    //save to Backend
    console.log('################');
    console.log('title : ', this.incident.title);
    console.log('description : ', this.incident.description);
    console.log(this.incident.screenshotPath);
    console.log('date : ', this.incident.date);
    console.log('priotity : ', this.incident.priority);
    console.log('type : ', this.incident.type);

    console.log(this.incident);
    const formData = this.incident.getFormData();

    // formData.append('file', this.fileUpload.nativeElement.files[0]);
    await this.bugService.sendBug(formData).subscribe((event: any) => {

        this.router.navigate(['/screen-bugs']).then(() => {
          window.location.reload();
        });
      });

  }

  
  async updateIncident(){
    console.log(this.incident);

    const formData = new FormData();



    
    console.log("formData :");
    console.log(formData);

    await this.bugService.updateIncident(formData).subscribe((event: any) => {

        // this.router.navigate(['/screen-bugs']).then(() => {
        //   window.location.reload();
        // });
      });
  }

  loadScreenshot(event){

    this.incident.screenshotPath =  this.fileUpload.nativeElement.files[0];
    this.havePicture = true;

    this.displayScreenshot();

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.screenshot = (<FileReader>event.target).result;
      };
      // this.incident.screenshot =event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  displayScreenshot(){
    this.inputDiv.nativeElement.style.display = this.displayNone;
    this.viewerDiv.nativeElement.style.display = this.displayBlock;
  }

  cancelScreenshot(){
    this.havePicture = false;
    this.screenshot = null;

    this.fileUpload.nativeElement.type = 'text';
    this.fileUpload.nativeElement.type = 'file';

    this.incident.screenshotPath = null;

    this.viewerDiv.nativeElement.style.display = this.displayNone;
    this.inputDiv.nativeElement.style.display = this.displayBlock;
  }

  deleteIncident(){
    this.bugService.deleteBugById(this.incident.id).then((event: any) => {

      this.router.navigate(['/screen-bugs']).then(() => {
        window.location.reload();
      });
    });
  }
}
