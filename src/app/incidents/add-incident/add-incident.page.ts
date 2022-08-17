import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Incident } from 'src/entities/incident';
import { IncidentPropertiesService } from 'src/providers/services/incident-properties.service';
import { IncidentService } from 'src/providers/services/incident.service';
import { DateUtil } from 'src/utils/dateUtil';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.page.html',
  styleUrls: ['./add-incident.page.scss'],
})
export class AddIncidentPage implements OnInit {

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  @ViewChild('inputDiv', { static: false }) inputDiv: ElementRef;
  @ViewChild('viewerDiv', { static: false }) viewerDiv: ElementRef;

  public havePicture = false;
  public incident: Incident;

  // Variables à afficher
  public typesList: string[];
  public prioritiesList: string[];
  public statusList: string[];
  public screenshot;
  public date: string;

  // Etat de la page
  public state: string;
  public readonly STATE_NEW = 'NEW';
  public readonly STATE_UPDATE = 'UPDATE';

  public readonly INCIDENTS_PAGE = '/incidents';

  private displayNone = 'none';
  private displayBlock = 'block';

  constructor(private route: ActivatedRoute, private router: Router,
    private incidentService: IncidentService, public toastController: ToastController,
    public incidentPropertiesService: IncidentPropertiesService ) {
  }


  async ngOnInit() {
    this.incident = new Incident();
    this.typesList = (await this.incidentPropertiesService.getTypes()).properties;
    await this.incidentPropertiesService.getPriorities().then((incidentPriority) => {
      this.prioritiesList = incidentPriority.properties;
      this.incident.priority = incidentPriority.defaultProperty;
    });
    
    await this.incidentPropertiesService.getStatus().then((incidentStatus) => {
      this.statusList = incidentStatus.properties;
      this.incident.status = incidentStatus.defaultProperty;
    });

    
    if (this.route.snapshot.data.special) {
      this.incident = await this.getIncident(this.route.snapshot.data.special.id);
      this.screenshot = this.incident.screenshotWebPath;
      this.state = this.STATE_UPDATE;
      this.date = this.incident.date.toISOString();
    } else {
      this.state = this.STATE_NEW;

      // Initialisation date du jour
      this.incident.date = new Date();
      this.date = this.incident.date.toISOString();
      this.incident.screenshotPath = '';
      this.incident.screenshotWebPath = '';
      this.incident.description = '';
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
   *
   * @param formValue
   */
  saveAction(formValue) {
    if (this.formValueIsComplete()) {
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

  async getIncident(id): Promise<Incident> {
    return await this.incidentService.get(id);
  }

  /**
   * Met à jour incident.date avec la date sélectionné
   */
  updateDate() {
    this.incident.date = DateUtil.convertStringDateToDate(this.date);
  }

  /**
   * Charge l'image envoyé par l'input
   *
   * @param event
   */
  loadScreenshot(event) {
    this.havePicture = true;
    this.displayScreenshot();

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (progressEvent: ProgressEvent) => {
        this.screenshot = (progressEvent.target as FileReader).result;
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

    this.incident.screenshotPath = '';
    this.incident.screenshotWebPath = '';

    this.viewerDiv.nativeElement.style.display = this.displayNone;
    this.inputDiv.nativeElement.style.display = this.displayBlock;
  }

  /**
   * Envoie une requête pour supprimer l'incident actuel
   */
  deleteIncident() {
    if (confirm('Êtes vous sûr de vouloir supprimer l\'incident?')) {
      this.incidentService.deleteById(this.incident.id).then((event: any) => {
        this.router.navigate([this.INCIDENTS_PAGE]).then(() => {
        });
      });
    }
  }

  /**
   * Valide si l'objet Incident est complet et prêt à être sauvegarder
   * Dans le cas contraîre fait apparaître un toast
   *
   * @returns Boolean
   */
  formValueIsComplete(): boolean {
    if (!this.incident.title ||
      !this.incident.description ||
      !this.incident.priority ||
      !this.incident.status ||
      !this.incident.type) {
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

    return formData;
  }
}
