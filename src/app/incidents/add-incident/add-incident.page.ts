import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Incident } from 'src/entities/incident';
import { IncidentPropertiesService } from 'src/providers/services/incident-properties.service';
import { IncidentService } from 'src/providers/services/incident.service';
import { ImageInputComponent } from './components/image-input/image-input.component';


@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.page.html',
  styleUrls: ['./add-incident.page.scss'],
})
export class AddIncidentPage implements OnInit {

  @ViewChild('imageInput') imageInput: ImageInputComponent;

  public incident: Incident;

  // Variables à afficher
  public typesList: string[];
  public prioritiesList: string[];
  public statusList: string[];
  public screenshot;
  public updatedAt: string;
  public createdAt: string;

  // Etat de la page
  public state: string;
  public readonly STATE_NEW = 'NEW';
  public readonly STATE_UPDATE = 'UPDATE';

  public readonly INCIDENTS_PAGE = '/incidents';

  constructor(private route: ActivatedRoute, private router: Router,
    private incidentService: IncidentService, public toastController: ToastController,
    public incidentPropertiesService: IncidentPropertiesService) {

    this.incident = new Incident();
  }


  async ngOnInit() {
    this.incident = new Incident();

    const incidentType = await this.incidentPropertiesService.getTypes();
    const incidentPriorities = await this.incidentPropertiesService.getPriorities();
    const incidentStatus = await this.incidentPropertiesService.getStatus();

    if (incidentType && incidentPriorities && incidentStatus) {
      this.typesList = incidentType.properties;
      this.prioritiesList = incidentPriorities.properties;
      this.incident.priority = incidentPriorities.defaultProperty;

      this.statusList = incidentStatus.properties;
      this.incident.status = incidentStatus.defaultProperty;
    }

    if (this.route.snapshot.data.special) {
      this.state = this.STATE_UPDATE;
      this.incident = await this.getIncident(this.route.snapshot.data.special.id);

      this.screenshot = this.incident.screenshotWebPath;
      this.updatedAt = this.incident.updatedAt.toISOString();
      this.createdAt = this.incident.createdAt.toISOString();

    } else {
      this.state = this.STATE_NEW;

      // Initialisation date du jour
      this.incident.createdAt = new Date();
      this.createdAt = this.incident.createdAt.toISOString();
      this.updatedAt = this.createdAt;

      this.incident.screenshotPath = '';
      this.incident.screenshotWebPath = '';
      this.incident.description = '';
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
        formValue.updatedAt = new Date().toISOString();
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
    this.updatedAt = this.createdAt;
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
   * Retire les images de l'objet Incident
   */
  cancelImage(){
    this.incident.screenshotPath = '';
    this.incident.screenshotWebPath = '';
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
      message: 'L\'incident n\'est pas complet et ne peut être sauvegarder en l\'état',
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
    formData.append('file', this.imageInput.getFile());
    return formData;
  }
}
