import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PriorityConst } from 'src/constants/priorityConst';
import { StatusConst } from 'src/constants/statusConst';
import { TypeConst } from 'src/constants/typeConst';
import { Incident } from 'src/entities/incident';
import { IncidentService } from 'src/providers/services/incident.service';

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
  public priorities: string[];
  public statusList: string[];
  public defaultPriority;

  public state: string;

  public readonly STATE_NEW: string; // = 'NEW';
  public readonly STATE_UPDATE = 'UPDATE';

  public readonly INCIDENTS_PAGE = "/incidents";

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  // @ViewChild("viewer", {static: false}) viewer: ElementRef;
  @ViewChild('inputDiv', { static: false }) inputDiv: ElementRef;
  @ViewChild('viewerDiv', { static: false }) viewerDiv: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private incidentService: IncidentService) {
    this.incident = new Incident();
    this.types = TypeConst.getTypes();
    this.priorities = PriorityConst.getPriority();
    this.statusList = StatusConst.getStatus();
    this.defaultPriority = 'normal';

    // this.STATE_NEW = 'NEW';
    this.STATE_UPDATE = 'UPDATE';
    this.state = this.STATE_NEW;
  }

  data: any;

  ngOnInit() {
    this.incident = new Incident();
    if (this.route.snapshot.data.special) { // TODO Faire un appel au serveur
      this.incident = this.route.snapshot.data.special; 
      this.screenshot = this.incident.screenshotWebPath;
      this.state = this.STATE_UPDATE;
    } else {
      this.state = this.STATE_NEW;
      this.incident = new Incident();
      this.incident.priority = this.defaultPriority;
      this.incident.date = new Date().toISOString();
      this.incident.status = StatusConst.toDo;
      this.incident.screenshotPath = "";
      this.incident.screenshotWebPath = "";
      this.incident.description = "";
    }
  }

  ionViewWillEnter() {
    if (this.state === this.STATE_UPDATE) {

      if (this.incident.screenshotWebPath) {
        this.displayScreenshot();
      }
    }
  }


  saveAction(formValue) {
    if (this.state == this.STATE_NEW) {
      this.addIncident(formValue);
    } else {
      this.updateIncident(formValue);
    }
  }

  async addIncident(formValue) {
    await this.incidentService.save(this.generateIncidentFormData(formValue)).then((event: any) => {
      this.router.navigate([this.INCIDENTS_PAGE]).then(() => {
      });
    });
  }

  async updateIncident(formValue) {
    await this.incidentService.update(this.generateIncidentFormData(formValue)).then((event: any) => {
      this.router.navigate([this.INCIDENTS_PAGE]).then(() => {
      });
    });
  }

  /**
   * Génére un object FormData à partir d'un objet form.value
   * 
   * @param formValue 
   * @returns FormData
   */
  private generateIncidentFormData(formValue) {
    const formData = new FormData();
    Object.keys(formValue).map((key) => formData.append(key, formValue[key]));
    formData.append('file', this.fileUpload.nativeElement.files[0]);

    return formData
  }

  loadScreenshot(event) {
    this.havePicture = true;
    this.displayScreenshot();

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.screenshot = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  displayScreenshot() {
    this.inputDiv.nativeElement.style.display = this.displayNone;
    this.viewerDiv.nativeElement.style.display = this.displayBlock;
  }

  cancelScreenshot() {
    this.havePicture = false;
    this.screenshot = null;

    this.fileUpload.nativeElement.type = 'text';
    this.fileUpload.nativeElement.type = 'file';

    this.incident.screenshotPath = "";
    this.incident.screenshotWebPath = "";

    this.viewerDiv.nativeElement.style.display = this.displayNone;
    this.inputDiv.nativeElement.style.display = this.displayBlock;
  }

  deleteIncident() {
    if(confirm("Êtes vous sûr de vouloir supprimer l'incident?")) {
      this.incidentService.deleteById(this.incident.id).then((event: any) => {
        this.router.navigate([this.INCIDENTS_PAGE]).then(() => {
        });
      });
    }
  }
}
