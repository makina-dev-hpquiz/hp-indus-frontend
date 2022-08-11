import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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

  public readonly STATE_NEW = 'NEW';
  public readonly STATE_UPDATE = 'UPDATE';

  public readonly INCIDENTS_PAGE = "/incidents";

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  @ViewChild('inputDiv', { static: false }) inputDiv: ElementRef;
  @ViewChild('viewerDiv', { static: false }) viewerDiv: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private incidentService: IncidentService, public toastController: ToastController) {
    this.incident = new Incident();
    this.types = TypeConst.getTypes();
    this.priorities = PriorityConst.getPriority();
    this.statusList = StatusConst.getStatus();
    this.defaultPriority = 'normal';

    this.state = this.STATE_NEW;
  }


  async ngOnInit() {
    this.incident = new Incident();
    if (this.route.snapshot.data.special) { 
      this.incident = await this.getIncident(this.route.snapshot.data.special.id); 
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

  /**
   * A l'entrée de la page on tente d'afficher l'image s'il y en a une
   */
  ionViewWillEnter() {
    if (this.state === this.STATE_UPDATE) {
      if (this.incident.screenshotWebPath) {
        this.displayScreenshot();
      }
    }
  }

  /**
   * Enclenche les actions de sauvegarde en fonction de l'état de la page
   * @param formValue 
   */
  saveAction(formValue) {
    if(this.formValueIsComplete()) {
      if (this.state === this.STATE_NEW) {
        this.addIncident(formValue);
      } else {
        this.updateIncident(formValue);
      }
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

  async getIncident(id): Promise<Incident>{
    return await this.incidentService.get(id);
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

  /**
   * Charge l'image envoyé par l'input
   * @param event 
   */
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

  /**
   * Active l'afficheur d'image
   */
  displayScreenshot() {
    this.inputDiv.nativeElement.style.display = this.displayNone;
    this.viewerDiv.nativeElement.style.display = this.displayBlock;
  }

  /**
   * Annule l'image en la retirant dans l'objet Incident et remettant à disposition
   * les éléments permettant de choisir une image
   */
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

  /**
   * Envoie une requête pour supprimer l'incident actuel
   */
  deleteIncident() {
    if(confirm("Êtes vous sûr de vouloir supprimer l'incident?")) {
      this.incidentService.deleteById(this.incident.id).then((event: any) => {
        this.router.navigate([this.INCIDENTS_PAGE]).then(() => {
        });
      });
    }
  }
  
  /**
   * Valide si l'objet Incident est complet et prêt à être sauvegarder
   * Dans le cas contraîre fait apparaître un toast
   * @returns Boolean
   */
  formValueIsComplete(): boolean {
    if(!this.incident.title ||
      !this.incident.description ||
      !this.incident.priority ||
      !this.incident.status ||
      !this.incident.type){
        this.presentToast();
        return false;
    }

    return true;
  }

  /**
   * Fait apparaître un message
   */
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'L\'incident n`\'est pas complet et ne peut être sauvegarder en l\'état',
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

}


